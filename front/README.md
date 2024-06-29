![image](https://github.com/mkmuniz/Biflux/assets/65512888/734ea2ad-1918-4572-bd8e-508d473dd1ab)

---
# Table of Contents
- [Config](#config)
- [How to Run](#how-to-run)

# Setup
`node >= 18.x.x` & `npm >= 6.x.x`

Create a `.env` file into `front` folder and fill out these informations:

```env
NEXTAUTH_URL=
NEXTAUTH_SECRET=

AWS_IAM_USER_SECRET_KEY=
AWS_IAM_USER_ACCESS_KEY=

NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY=
```

# How To Run

### Dev environment

- `npm install`
- `npm run dev`

### Production environment

- `npm run build`
- `npm start`

Access it `http://localhost:3000`
