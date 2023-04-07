import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		res.status(405).json({ message: "INVALID_METHOD" });
		return;
	}

	// Variables
	const { name, email, message } = req.body;

	if (!name || !email || !message) {
		res.status(400).json({ message: "INVALID_PARAMETER" });
		return;
	}

	// Syntaxe adresse email
	const pattern =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!pattern.test(email)) {
		res.status(400).send({
			message: "EMAIL_SYNTAX_INCORRECT",
		});
		return;
	}


	const messages = message
		.replace(/\n/g, "<br>")
		.replace(/\r/g, "<br>")
		.replace(/\t/g, "<br>")
		.replace(/<(?!br\s*\/?)[^>]+>/g, "");

	sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

	const sendGridMail = {
		to: process.env.ADMIN_EMAIL as string,
		from: process.env.ADMIN_EMAIL as string,
		templateId: "d-87afce6c828f4181b087c284897a51c1",
		dynamic_template_data: {
			name: name,
			email: email,
			message: messages,
		},
	};
	(async () => {
		try {
			await sgMail.send(sendGridMail);
			res.status(200).json({
				message: "EMAIL_SENDED_SUCCESSFULLY",
			});
			res.end()
		} catch {
			res.status(500).json({
				message: "ERROR_WITH_SENDGRID",
			});
			res.end()
			return;
		}
	})();
}
