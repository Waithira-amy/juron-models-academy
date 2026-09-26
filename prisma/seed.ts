import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ALL_NOMINEES = [
  // Mavoko
  { name: "King Masconde", code: "MVK01", category: "mavoko", title: "Mr", photoUrl: "/nominees/king-masconde.jpg" },
  { name: "Emmanuel Dennis", code: "MVK02", category: "mavoko", title: "Mr", photoUrl: "/nominees/emmanuel-dennis.jpg" },
  { name: "Brian Lokiridi", code: "MVK03", category: "mavoko", title: "Mr", photoUrl: "/nominees/brian-lokiridi.jpg" },
  { name: "Abigael Mbula Kioko", code: "MVK04", category: "mavoko", title: "Miss", photoUrl: "/nominees/abigael-mbula-kioko.jpg" },
  { name: "Jemimah Mutuku Musenya", code: "MVK05", category: "mavoko", title: "Miss", photoUrl: "/nominees/jemimah-mutuku-musenya.jpg" },
  { name: "Everlyne Musyoki", code: "MVK06", category: "mavoko", title: "Miss", photoUrl: "/nominees/everlyne-musyoki.jpg" },
  { name: "Peggycate", code: "MVK07", category: "mavoko", title: "Miss", photoUrl: "/nominees/peggycate.jpg" },
  { name: "Stephanie Saiteyia", code: "MVK08", category: "mavoko", title: "Miss", photoUrl: "/nominees/stephanie-saiteyia.jpg" },
  { name: "Grace Wangui", code: "MVK09", category: "mavoko", title: "Miss", photoUrl: "/nominees/grace-wangui.jpg" },
  { name: "Bridget Wambui Mugo", code: "MVK10", category: "mavoko", title: "Miss", photoUrl: "/nominees/bridget-wambui-mugo.jpg" },

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

  // Diaspora
  { name: "Yussuf Abubakar", code: "DSP01", category: "diaspora", title: "Mr", photoUrl: "/nominees/yussuf-abubakar.jpg" },
  { name: "Andrew Muema Muthyokavi", code: "DSP02", category: "diaspora", title: "Mr", photoUrl: "/nominees/andrew-muema-muthyokavi.jpg" },
  { name: "Obi Ifaenyi", code: "DSP03", category: "diaspora", title: "Mr", photoUrl: "/nominees/obi-ifaenyi.jpg" },
  { name: "Esther Odikara", code: "DSP04", category: "diaspora", title: "Miss", photoUrl: "/nominees/esther-odikara.jpg" },
  { name: "Adah Nabocho", code: "DSP05", category: "diaspora", title: "Miss", photoUrl: "/nominees/adah-nabocho.jpg" },
  { name: "Jennifer Simon", code: "DSP06", category: "diaspora", title: "Miss", photoUrl: "/nominees/jennifer-simon.jpg" },
  { name: "Beatrice Ingoka", code: "DSP07", category: "diaspora", title: "Miss", photoUrl: "/nominees/beatrice-ingoka.jpg" },
  { name: "Amy Ngunjiri", code: "DSP08", category: "diaspora", title: "Miss", photoUrl: "/nominees/amy-ngunjiri.jpg" },
  { name: "Teresia Nduku", code: "DSP09", category: "diaspora", title: "Miss", photoUrl: "/nominees/teresia-nduku.jpg" },
  { name: "Sharon Ingasian", code: "DSP10", category: "diaspora", title: "Miss", photoUrl: "/nominees/sharon-ingasian.jpg" },
  { name: "Miriam Monique", code: "DSP11", category: "diaspora", title: "Miss", photoUrl: "/nominees/miriam-monique.jpg" },
  { name: "Roseline Atieno Otieno", code: "DSP12", category: "diaspora", title: "Miss", photoUrl: "/nominees/roseline-atieno-otieno.jpg" }
];

async function main() {
  console.log("Seeding nominees...");
  for (const n of ALL_NOMINEES) {
    await (prisma as any).voting.upsert({
      where: { code: n.code },
      update: {
        fullName: n.name,
        category: n.category,
        title: n.title,
        photoUrl: n.photoUrl,
      },
      create: {
        code: n.code,
        fullName: n.name,
        category: n.category,
        title: n.title,
        photoUrl: n.photoUrl,
        votes: 0
      }
    });
    console.log(`Synced ${n.code} - ${n.name}`);
  }
  console.log("Done seeding.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });