# 🔐 NestJS + JWT Auth: ระบบยืนยันตัวตนด้วย Token

โปรเจกต์นี้เป็นตัวอย่างการสร้างระบบ Authentication ด้วย NestJS, Passport.js และ JWT (JSON Web Token) โดยเชื่อมต่อกับฐานข้อมูลผ่าน Prisma ORM เหมาะสำหรับนำไปต่อยอดในระบบที่ต้องมีการยืนยันตัวตนผู้ใช้

---

## ⚙️ เทคโนโลยีที่ใช้

- **NestJS** – Backend Framework ที่เขียนด้วย TypeScript
- **Passport.js** – Middleware สำหรับ authentication
- **JWT (jsonwebtoken)** – ระบบ token-based authentication
- **Prisma ORM** – จัดการฐานข้อมูลแบบ type-safe
- **PostgreSQL** – ตัวอย่างฐานข้อมูลที่ใช้งานผ่าน Docker
- **class-validator / class-transformer** – ตรวจสอบและแปลงค่าจาก DTO

---

## 🚀 ขั้นตอนการพัฒนา

### 1. สร้างโมดูล Auth และ User
- แยก controller, service, และ DTO อย่างชัดเจน
- ใช้ Passport strategy เพื่อจัดการ JWT

### 2. ติดตั้ง Passport และ JWT
```bash
npm install @nestjs/passport passport passport-jwt
npm install @nestjs/jwt
```
3. ตั้งค่า Prisma ORM
แก้ไข schema.prisma ให้มี model User

```
prisma migrate dev 
prisma generate
```
4. เขียน service สำหรับสมัครสมาชิก / เข้าสู่ระบบ
สร้าง user ใหม่ด้วย Prisma

ตรวจสอบรหัสผ่านด้วย bcrypt

5. ใช้ AuthGuard ป้องกัน route ที่ต้อง login
- เพิ่ม **@UseGuards(JwtAuthGuard)** 

6. เพิ่ม ValidationPipe และ API Prefix
```
app.setGlobalPrefix('api/v1');
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
```

### 🔐 ตัวอย่าง JWT API

| Method | Endpoint                | Description                    |
|--------|-------------------------|--------------------------------|
| POST   | `/api/v1/auth/signup`   | สมัครสมาชิกใหม่               |
| POST   | `/api/v1/auth/login`    | เข้าสู่ระบบ รับ JWT            |
| GET    | `/api/v1/users/profile` | ดึงข้อมูลผู้ใช้ (ต้องใช้ token) |

## 📁 โครงสร้างโปรเจกต์
```
src/
├── auth/ ← โมดูลสำหรับยืนยันตัวตน
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ ├── auth.module.ts
│ ├── dto/
│ │ ├── login.dto.ts
│ │ └── signup.dto.ts
│ └── strategies/
│ └── jwt.strategy.ts
│
├── users/ ← โมดูลสำหรับจัดการผู้ใช้
│ ├── users.controller.ts
│ ├── users.service.ts
│ ├── users.module.ts
│ └── entities/
│ └── user.entity.ts
│
├── prisma/ ← Prisma service และ module
│ ├── prisma.module.ts
│ └── prisma.service.ts
│
├── app.module.ts ← โมดูลหลักของแอป
└── main.ts ← Entry point ของแอป
```
## 🧪 การทดสอบ API

คุณสามารถทดสอบ API ได้ผ่าน Postman หรือ curl โดยทำตามขั้นตอนดังนี้:

1. `POST /api/v1/auth/signup` – สมัครสมาชิกใหม่ โดยส่ง email และ password
2. `POST /api/v1/auth/login` – เข้าสู่ระบบเพื่อรับ JWT token
3. นำ token ที่ได้จากขั้นตอนที่ 2 ไปใช้กับ header `Authorization: Bearer <token>` เพื่อเข้าถึง endpoint:
   - `GET /api/v1/users/profile` – ดึงข้อมูลผู้ใช้ (ต้องยืนยันตัวตน)