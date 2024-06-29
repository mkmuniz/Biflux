![image](https://github.com/mkmuniz/Biflux/assets/65512888/734ea2ad-1918-4572-bd8e-508d473dd1ab)

---
# Table of Contents
- [Config](#config)
- [How to Run](#how-to-run)

# Setup
`node >= 18.x.x` & `npm >= 6.x.x`

Create a `.env` file into `front` folder and fill out these informations:

```env
NEXT_PUBLIC_BASE_URL_API="http://localhost:4000"
NEXT_PUBLIC_GOOGLE_RECAPTCHA_KEY=6LdteAEqAAAAAIkIDGrBcU1q3Pz40mTwch-1x50I

NEXTAUTH_URL=http://localhost:3000/
NEXTAUTH_SECRET=testSecret

AWS_IAM_USER_SECRET_KEY="rLJHhREhyr8ku2MteKeQaxzNBPIU4GY57f/pHwZA"
AWS_IAM_USER_ACCESS_KEY="AKIA3JJS6QIKC2LUMQFF"
```

# How To Run

### Dev environment

- `npm install`
- `npm run dev`

### Production environment

- `npm run build`
- `npm start`

Access it `http://localhost:3000`
