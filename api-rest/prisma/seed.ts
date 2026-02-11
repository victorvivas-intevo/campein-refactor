import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Limpieza de datos (Opcional - Eliminar en orden de relaciones para evitar errores de FK)
  await prisma.userSession.deleteMany({});
  await prisma.formAssignmentUser.deleteMany({});
  await prisma.formSubmission.deleteMany({});
  await prisma.formVersion.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.form.deleteMany({});
  await prisma.tenant.deleteMany({});

  console.log('Iniciando el sembrado de datos (Seeding)...');

  // 2. Tenantes (Tenants)
  await prisma.tenant.createMany({
    data: [
      {
        id: 'b17c1160-adfd-4995-b218-f033124f13df',
        name: 'Intevo S.A.S',
        createdAt: new Date('2025-12-16T08:19:07Z'),
      },
      {
        id: 'fe5336fa-ad6b-4c98-8a3f-e769f88a228a',
        name: 'Bongo Analitics',
        createdAt: new Date('2025-12-16T08:19:07Z'),
      },
      {
        id: '29bc37c6-0932-4f1c-9b29-d46f79edc767',
        name: 'Paloma Valencia',
        createdAt: new Date('2026-01-15T16:57:12Z'),
      },
    ],
  });

  // 3. Usuarios (Users) - Se crean individualmente para manejar la jerarquía de líderes
  const usersData = [
    {
      id: '19877b12-b8d8-49f0-8da7-fbdfb625f005',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'admin.campain@yopmail.com',
      password: '$2b$12$QJp7qoXhqpdFxHyD6sB3Hua3Ogrr8lqn.Z0mOzlbv4aKgYzfmkofe',
      fullName: 'Admin campaña',
      role: 'ADMIN_CAMPANA',
      createdAt: new Date('2025-12-17T11:15:49.556Z'),
      leaderId: null,
      isActive: true,
    },
    {
      id: '0796a8a3-3701-4f95-80e3-f9d74184299d',
      tenantId: '29bc37c6-0932-4f1c-9b29-d46f79edc767',
      email: 'admin-paloma.valencia@yopmail.com',
      password: '$2b$12$QJp7qoXhqpdFxHyD6sB3Hua3Ogrr8lqn.Z0mOzlbv4aKgYzfmkofe',
      fullName: 'Admin Campaña Paloma Valencia',
      role: 'ADMIN_CAMPANA',
      createdAt: new Date('2026-01-15T17:09:26.674Z'),
      leaderId: null,
      isActive: true,
    },
    {
      id: 'd63465f7-43e9-4a4b-a371-399e127e947f',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'victor.vivas@intevo.com.co',
      password: '$2b$12$QJp7qoXhqpdFxHyD6sB3Hua3Ogrr8lqn.Z0mOzlbv4aKgYzfmkofe',
      fullName: 'Victor Vivas',
      role: 'ADMIN_SISTEMA',
      createdAt: new Date('2025-12-16T08:20:21.705Z'),
      leaderId: null,
      isActive: true,
    },
    {
      id: '37232eaf-16f9-4227-a0f5-a812912d8279',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'lideralfa1.intevo@yopmail.com',
      password: '$2b$12$hEshciskncnO.fjtzl7yS.FhbxLDhDTj7CkExM22ADaYghKZsfIGG',
      fullName: 'Camila Buitrago',
      role: 'LIDER_ALFA',
      createdAt: new Date('2026-02-08T07:10:58.274Z'),
      leaderId: null,
      isActive: true,
    },
    {
      id: '09479208-d453-4130-9a48-bc66f1ecdb34',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'lideralfa3.intevo@yopmail.com',
      password: '$2b$12$Fw1GVsv9yfG6Nz.WeyMRj.FPl7FeeZ3svsPXdlR7xKSXcuA4DqPya',
      fullName: 'Jennifer Puentes',
      role: 'LIDER_ALFA',
      createdAt: new Date('2026-02-08T07:11:15.641Z'),
      leaderId: null,
      isActive: true,
    },
    {
      id: 'ac7f1524-803d-4e70-8ae3-267bdf91e177',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'lideralfa2.intevo@yopmail.com',
      password: '$2b$12$gRB1avgbH6l1pzNDthn5vex.x.E1RSNv0uTrPSfe.6Bcvje9tlumG',
      fullName: 'Andres Ochoa',
      role: 'LIDER_ALFA',
      createdAt: new Date('2026-02-08T07:10:35.156Z'),
      leaderId: null,
      isActive: false,
    },
    {
      id: '6ccb5b8a-30e4-4219-892d-67e242ffab46',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'liderbeta0.intevo@yopmail.com',
      password: '$2b$12$8t/stOhh8k05NgLL0u49Z.M.9xZBzf/w6YmmFaMknoZHV06ePFIbW',
      fullName: 'beta 0',
      role: 'LIDER_BETA',
      createdAt: new Date('2026-02-08T07:11:56.496Z'),
      leaderId: '37232eaf-16f9-4227-a0f5-a812912d8279',
      isActive: true,
    },
    {
      id: 'a9778bf3-7c3d-4442-a882-7ed4483b736e',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'liderbeta1.intevo@yopmail.com',
      password: '$2b$12$dBHMAwgdNn.oxh8pUyE5wOGGlgXvqLj5wpfLFLOT5HVwcSDh1/kH2',
      fullName: 'beta 1',
      role: 'LIDER_BETA',
      createdAt: new Date('2026-02-08T07:12:03.211Z'),
      leaderId: '37232eaf-16f9-4227-a0f5-a812912d8279',
      isActive: true,
    },
    {
      id: '6acd700d-e23c-4d27-b240-449a1b4d0ee3',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'liderbeta2.intevo@yopmail.com',
      password: '$2b$12$xhyElx8oQeEQRtoQAMio4eVewSm0WAEsf/hEqIcGb1kvoCLXuCTT2',
      fullName: 'beta 2',
      role: 'LIDER_BETA',
      createdAt: new Date('2026-02-08T07:12:08.352Z'),
      leaderId: '37232eaf-16f9-4227-a0f5-a812912d8279',
      isActive: true,
    },
    {
      id: '32974df7-cb9b-42c1-9009-8423b4d7547b',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'liderbeta3.intevo@yopmail.com',
      password: '$2b$12$tdE/0JwQEc7muwbja2TcBuPbDNk4vmik3PTnnGUIdDwHJxN0OboWC',
      fullName: 'beta 3',
      role: 'LIDER_BETA',
      createdAt: new Date('2026-02-08T07:12:15.878Z'),
      leaderId: '09479208-d453-4130-9a48-bc66f1ecdb34',
      isActive: true,
    },
    {
      id: '9cbe64e8-3df2-42ed-94d6-4e21eedfb700',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'liderbeta4.intevo@yopmail.com',
      password: '$2b$12$M7soxA6WUyEiimIK6UYGi.Ku5coMioFFI4lu4xHWTZQsAmfsituiG',
      fullName: 'beta 4',
      role: 'LIDER_BETA',
      createdAt: new Date('2026-02-08T07:12:23.25Z'),
      leaderId: '09479208-d453-4130-9a48-bc66f1ecdb34',
      isActive: true,
    },
    {
      id: 'f23064bf-9eed-4180-ac21-279f7ddcefd5',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'liderbeta5.intevo@yopmail.com',
      password: '$2b$12$ZRWMUo4r5qxcz052VW9pzunWisfdGE2cBsatk/f4duITplExwAgAW',
      fullName: 'beta 5',
      role: 'LIDER_BETA',
      createdAt: new Date('2026-02-08T07:12:28.505Z'),
      leaderId: '09479208-d453-4130-9a48-bc66f1ecdb34',
      isActive: false,
    },
    {
      id: '9d792287-b777-4624-92ca-f28d1beaff0e',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'liderbeta6.intevo@yopmail.com',
      password: '$2b$12$ELbhW4tosKB9XunTraAp5OoguRUh8ElrwGu8RRHaVx46J0DSY5rIO',
      fullName: 'beta 6',
      role: 'LIDER_BETA',
      createdAt: new Date('2026-02-09T23:03:51.793Z'),
      leaderId: '37232eaf-16f9-4227-a0f5-a812912d8279',
      isActive: false,
    },
    {
      id: 'b8b431e5-6095-4654-aeb0-8333273e6710',
      tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
      email: 'liderbeta7.intevo@yopmail.com',
      password: '$2b$12$bWWcaFRzIkLA5/zLYWkM/epqjA.G2S1P2UqbBecwLKUgpVDNk5892',
      fullName: 'beta 7',
      role: 'LIDER_BETA',
      createdAt: new Date('2026-02-09T23:08:06.808Z'),
      leaderId: '37232eaf-16f9-4227-a0f5-a812912d8279',
      isActive: false,
    },
  ];

  for (const u of usersData) {
    await prisma.user.create({ data: u });
  }

  // 4. Formularios (Forms)
  await prisma.form.createMany({
    data: [
      {
        id: '3fe84c0d-daa0-4b21-9f85-d046ef554016',
        tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
        code: 'voluntario-publico',
        name: 'Voluntarios',
        description: 'Registro publico de voluntariado',
        isActive: true,
        isPublic: true,
      },
      {
        id: '0a45dbaf-6f98-479d-82aa-6d8e504006e3',
        tenantId: 'b17c1160-adfd-4995-b218-f033124f13df',
        code: 'formulario-contacto',
        name: 'Formulario de contacto',
        description: 'Formulario para recolección de contactos',
        isActive: true,
        isPublic: false,
      },
    ],
  });

  // 5. Versiones de Formularios (Form Versions)
  await prisma.formVersion.createMany({
    data: [
      {
        id: '0a8d6cf3-14c4-4644-8ed4-e09b2b0338c6',
        formId: '3fe84c0d-daa0-4b21-9f85-d046ef554016',
        version: 1,
        schema: {
          /* Pegar el JSON largo del campo schema en el SQL */
        },
        isActive: true,
      },
      {
        id: '9da235e7-0b20-4562-a083-5476191cdcca',
        formId: '0a45dbaf-6f98-479d-82aa-6d8e504006e3',
        version: 2,
        schema: {
          /* ... */
        },
        isActive: true,
      },
    ],
  });

  // 6. Envíos de Formularios (Form Submissions)
  await prisma.formSubmission.createMany({
    data: [
      {
        id: 'd3c1c476-ee1c-4b9b-8017-c8866ed3437d',
        formId: '3fe84c0d-daa0-4b21-9f85-d046ef554016',
        formVersionId: '0a8d6cf3-14c4-4644-8ed4-e09b2b0338c6',
        payload: {
          email: 'dasdas@asd.com',
          firstName: 'asd',
          interestGroup: 'Educación' /* ... */,
        },
        submittedAt: new Date('2025-12-19T13:48:09Z'),
      },
      {
        id: '8eff82d9-8b83-4a5b-92ef-bb3896a1f1fc',
        formId: '0a45dbaf-6f98-479d-82aa-6d8e504006e3',
        formVersionId: '9da235e7-0b20-4562-a083-5476191cdcca',
        submittedBy: 'd63465f7-43e9-4a4b-a371-399e127e947f',
        payload: { firstName: 'sasdas', interestGroup: 'Educación' /* ... */ },
        submittedAt: new Date('2026-02-02T08:26:27Z'),
      },
    ],
  });

  // 7. Asignaciones de Formularios (Form Assignments)
  await prisma.formAssignmentUser.createMany({
    data: [
      {
        formId: '3fe84c0d-daa0-4b21-9f85-d046ef554016',
        userId: '37232eaf-16f9-4227-a0f5-a812912d8279',
      },
      {
        formId: '0a45dbaf-6f98-479d-82aa-6d8e504006e3',
        userId: '37232eaf-16f9-4227-a0f5-a812912d8279',
      },
    ],
  });

  console.log('Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
