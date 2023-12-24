
    export default async function handler(req, res) {
        console.log('hi handler')
        if (req.method === 'POST') {
            const { name, email, message } = req.body;
            const slackMessage = `New contact form submission:\n- Name: ${name}\n- Email: ${email}\n- Message: ${message}`;
            console.log(`slack webhook: ${process.env.SLACK_WEBHOOK_URL}`)

            fetch(process.env.SLACK_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: slackMessage }),
            })
                .then(response => {
                    if (response.ok) {
                        return res.status(200).json({ message: 'Message sent to Slack successfully' });
                    } else {
                        throw new Error('Failed to send message to Slack');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    res.status(500).json({ message: 'Internal Server Error' });
                });
        } else {
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }
