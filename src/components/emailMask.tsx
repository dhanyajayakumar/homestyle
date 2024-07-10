function maskEmail(email: any) {
  const [localPart, domain] = email.split("@");
  const maskedLocalPart = localPart.substring(0, 3) + "****";
  return `${maskedLocalPart}@${domain}`;
}
