def parse_emails(email_string: str):
    return [email.strip() for email in email_string.split(",") if email.strip()]
