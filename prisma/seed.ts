import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL as string;

if (!connectionString) {
  console.error("❌ Error: DATABASE_URL is not set in your .env file!");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const ALL_NOMINEES = [
  // Mavoko (MVK01 King Masconde removed)
  { name: "Emmanuel Dennis", code: "MVK02", category: "mavoko", title: "Mr", photoUrl: "/nominees/emmanuel-dennis.jpg" },
  { name: "Brian Lokiridi", code: "MVK03", category: "mavoko", title: "Mr", photoUrl: "/nominees/brian-lokiridi.jpg" },
  { name: "Abigael Mbula Kioko", code: "MVK04", category: "mavoko", title: "Miss", photoUrl: "/nominees/abigael-mbula-kioko.jpg" },
  { name: "Jemimah Mutuku Musenya", code: "MVK05", category: "mavoko", title: "Miss", photoUrl: "/nominees/jemimah-mutuku-musenya.jpg" },
  { name: "Everlyne Musyoki", code: "MVK06", category: "mavoko", title: "Miss", photoUrl: "/nominees/everlyne-musyoki.jpg" },
  { name: "Peggycate", code: "MVK07", category: "mavoko", title: "Miss", photoUrl: "/nominees/peggycate.jpg" },
  { name: "Stephanie Saiteyia", code: "MVK08", category: "mavoko", title: "Miss", photoUrl: "/nominees/stephanie-saiteyia.jpg" },
  { name: "Grace Wangui", code: "MVK09", category: "mavoko", title: "Miss", photoUrl: "/nominees/grace-wangui.jpg" },
  { name: "Bridget Wambui Mugo", code: "MVK10", category: "mavoko", title: "Miss", photoUrl: "/nominees/bridget-wambui-mugo.jpg" },
  { name: "Roseline Atieno Otieno", code: "MVK11", category: "mavoko", title: "Miss", photoUrl: "/nominees/roseline-atieno-otieno.jpg" },
  { name: "Chelsea Tanya", code: "MVK12", category: "mavoko", title: "Miss", photoUrl: "/nominees/chelsea-tanya.jpg" },
  { name: "Tonny Musembi", code: "MVK13", category: "mavoko", title: "Mr", photoUrl: "/nominees/tonny-musembi.jpg" },

  // Township
  { name: "Kennedy Muasa", code: "TWN01", category: "township", title: "Mr", photoUrl: "/nominees/kennedy-muasa.jpg" },
  { name: "Bruno Brook", code: "TWN02", category: "township", title: "Mr", photoUrl: "/nominees/bruno-brook.jpg" },
  { name: "Fidel Mutuku", code: "TWN03", category: "township", title: "Mr", photoUrl: "/nominees/fidel-mutuku.jpg" },
  { name: "Benjamin Kimanthi", code: "TWN04", category: "township", title: "Mr", photoUrl: "/nominees/benjamin-kimanthi.jpg" },
  { name: "Shalom Mwendwa", code: "TWN05", category: "township", title: "Miss", photoUrl: "/nominees/shalom-mwendwa.jpg" },
  { name: "Marrion Atieno Juma", code: "TWN06", category: "township", title: "Miss", photoUrl: "/nominees/marrion-atieno-juma.jpg" },
  { name: "Whitney Kwamboka", code: "TWN07", category: "township", title: "Miss", photoUrl: "/nominees/whitney-kwamboka.jpg" },
  { name: "Reena Akinyi Odhiambo", code: "TWN08", category: "township", title: "Miss", photoUrl: "/nominees/reena-akinyi-odhiambo.jpg" },
  { name: "Dorcas Kimeu Muuo", code: "TWN09", category: "township", title: "Miss", photoUrl: "/nominees/dorcas-kimeu-muuo.jpg" },
  { name: "Claire Lucy Wanjiku", code: "TWN10", category: "township", title: "Miss", photoUrl: "/nominees/claire-lucy-wanjiku.jpg" },
  { name: "Faith Jeptum", code: "TWN11", category: "township", title: "Miss", photoUrl: "/nominees/faith-jeptum.jpg" },
  { name: "Rachael Kamutu Matheka", code: "TWN12", category: "township", title: "Miss", photoUrl: "/nominees/rachael-kamutu-matheka.jpg" },
  { name: "Mutanu Mbuvi", code: "TWN13", category: "township", title: "Miss", photoUrl: "/nominees/mutanu-mbuvi.jpg" },
  { name: "Mutuku Irene Mutindi", code: "TWN14", category: "township", title: "Miss", photoUrl: "/nominees/mutuku-irene-mutindi.jpg" },
  { name: "Milan Njeri Murimi", code: "TWN15", category: "township", title: "Miss", photoUrl: "/nominees/milan-njeri-murimi.jpg" },
  { name: "Mevine Truphosa", code: "TWN16", category: "township", title: "Miss", photoUrl: "/nominees/mevine-truphosa.jpg" },
  { name: "Damaris Amina", code: "TWN17", category: "township", title: "Miss", photoUrl: "/nominees/damaris-amina.jpg" },
  { name: "Joy Bernita Kerubo", code: "TWN18", category: "township", title: "Miss", photoUrl: "/nominees/joy-bernita-kerubo.jpg" },
  { name: "Maureen Wambui Karanja", code: "TWN19", category: "township", title: "Miss", photoUrl: "/nominees/maureen-wambui-karanja.jpg" },
  { name: "Mitchell Omollo", code: "TWN20", category: "township", title: "Miss", photoUrl: "/nominees/mitchell-omollo.jpg" },
  { name: "Kylian Robert Wambua", code: "TWN21", category: "township", title: "Mr", photoUrl: "/nominees/kylian-robert-wambua.jpg" },
  { name: "Gloria Mumbua", code: "TWN22", category: "township", title: "Miss", photoUrl: "/nominees/gloria-mumbua.jpg" },
  { name: "Almer Awino", code: "TWN23", category: "township", title: "Miss", photoUrl: "/nominees/almer-awino.jpg" },

  // Diaspora (DSP08 Amy Ngunjiri removed)
  { name: "Yussuf Abubakar", code: "DSP01", category: "diaspora", title: "Mr", photoUrl: "/nominees/yussuf-abubakar.jpg" },
  { name: "Andrew Muema Muthyokavi", code: "DSP02", category: "diaspora", title: "Mr", photoUrl: "/nominees/andrew-muema-muthyokavi.jpg" },
  { name: "Obi Ifaenyi", code: "DSP03", category: "diaspora", title: "Mr", photoUrl: "/nominees/obi-ifaenyi.jpg" },
  { name: "Esther Odikara", code: "DSP04", category: "diaspora", title: "Miss", photoUrl: "/nominees/esther-odikara.jpg" },
  { name: "Adah Nabocho", code: "DSP05", category: "diaspora", title: "Miss", photoUrl: "/nominees/adah-nabocho.jpg" },
  { name: "Jennifer Simon", code: "DSP06", category: "diaspora", title: "Miss", photoUrl: "/nominees/jennifer-simon.jpg" },
  { name: "Beatrice Ingoka", code: "DSP07", category: "diaspora", title: "Miss", photoUrl: "/nominees/beatrice-ingoka.jpg" },
  { name: "Teresia Nduku", code: "DSP09", category: "diaspora", title: "Miss", photoUrl: "/nominees/teresia-nduku.jpg" },
  { name: "Sharon Ingasian", code: "DSP10", category: "diaspora", title: "Miss", photoUrl: "/nominees/sharon-ingasian.jpg" },
  { name: "Miriam Monique", code: "DSP11", category: "diaspora", title: "Miss", photoUrl: "/nominees/miriam-monique.jpg" },

  // Mwala
  { name: "Cecilliah Nzilani", code: "MWL01", category: "mwala", title: "Miss", photoUrl: "/nominees/cecilliah-nzilani.jpg" },
  { name: "Rabbeca Nduku Maingi", code: "MWL02", category: "mwala", title: "Miss", photoUrl: "/nominees/rabbeca-nduku-maingi.jpg" },
  { name: "Darius Kaindi", code: "MWL03", category: "mwala", title: "Mr", photoUrl: "/nominees/darius-kaindi.jpg" },
  { name: "Catherine Mutuku", code: "MWL04", category: "mwala", title: "Miss", photoUrl: "/nominees/catherine-mutuku.jpg" },
  { name: "Diana Ndeda", code: "MWL05", category: "mwala", title: "Miss", photoUrl: "/nominees/diana-ndeda.jpg" },
  { name: "Keziah Monicah Mutaiti", code: "MWL06", category: "mwala", title: "Miss", photoUrl: "/nominees/keziah-monicah-mutaiti.jpg" },
  { name: "Trevis Kamau", code: "MWL07", category: "mwala", title: "Mr", photoUrl: "/nominees/trevis-kamau.jpg" },

  // Kangundo
  { name: "Praise Deborah Kithunga", code: "KAN01", category: "kangundo", title: "Miss", photoUrl: "/nominees/praise-deborah-kithunga.jpg" },
  { name: "Joshua Kennedy", code: "KAN02", category: "kangundo", title: "Mr", photoUrl: "/nominees/joshua-kennedy.jpg" },
  { name: "Winnie Mutheu", code: "KAN03", category: "kangundo", title: "Miss", photoUrl: "/nominees/winnie-mutheu.jpg" },
  { name: "Margaret Wanja Mwangi", code: "KAN04", category: "kangundo", title: "Miss", photoUrl: "/nominees/margaret-wanja-mwangi.jpg" },
  { name: "Kuki Japhet", code: "KAN05", category: "kangundo", title: "Mr", photoUrl: "/nominees/kuki-japhet.jpg" },
  { name: "Gladys Ngatha", code: "KAN06", category: "kangundo", title: "Miss", photoUrl: "/nominees/gladys-ngatha.jpg" }
];

async function main() {
  console.log("Seeding nominees to database...");
  for (const n of ALL_NOMINEES) {
    try {
      await (prisma as any).voting.upsert({
        where: { code: n.code },
        update: { fullName: n.name, category: n.category, title: n.title, photoUrl: n.photoUrl },
        create: { code: n.code, fullName: n.name, category: n.category, title: n.title, photoUrl: n.photoUrl, votes: 0 }
      });
      console.log(`✅ Synced ${n.code}`);
    } catch (err: any) {
      console.error(`❌ Failed to sync ${n.code}:`, err.message);
    }
  }
  console.log("🎉 Done seeding.");
}

main().finally(async () => { await prisma.$disconnect(); await pool.end(); });