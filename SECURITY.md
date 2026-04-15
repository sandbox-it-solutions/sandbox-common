# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅        |
| Older   | ❌        |

## Reporting a Vulnerability

We take security seriously at SandBox. If you discover a security vulnerability, please report it responsibly.

### How to Report

- **Email:** [security@sandbox-it.de](mailto:security@sandbox-it.de)
- **Response Time:** We aim to acknowledge reports within **48 hours**
- **Resolution:** Critical vulnerabilities are prioritized and patched within **7 days**

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- Suggested fix (if available)

### What to Expect

1. **Acknowledgment** within 48 hours
2. **Assessment** and severity classification within 5 business days
3. **Fix timeline** communicated based on severity:
   - 🔴 Critical: 24–72 hours
   - 🟠 High: 7 days
   - 🟡 Medium: 30 days
   - �� Low: Next release cycle

### Responsible Disclosure

- Please do **not** publicly disclose vulnerabilities before they are fixed
- Do **not** access or modify other users' data
- Do **not** perform denial-of-service attacks

### Scope

This policy applies to:
- All SandBox platform services (portal, API, admin, infrastructure)
- Dependencies and third-party integrations used by SandBox

### Recognition

We appreciate security researchers who help keep SandBox secure. With your permission, we will acknowledge your contribution in our changelog.

## Security Measures

- 🔐 All data encrypted in transit (TLS 1.2+) and at rest (AES-256)
- 🛡️ DSGVO/GDPR compliant data processing
- 🔑 bcrypt password hashing (12 rounds)
- 📝 Comprehensive audit logging
- 🚫 Rate limiting and brute-force protection
- 🔍 Automated dependency scanning (Dependabot, CodeQL, Gitleaks)
- ✅ Mandatory code review via pull requests
