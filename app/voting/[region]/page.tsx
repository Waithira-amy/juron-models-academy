"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { 
  Crown, ArrowLeft, CheckCircle2, Search, Sparkles, X, 
  Smartphone, Loader2, Download, Share2, ChevronRight, User, CreditCard 
} from "lucide-react";
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { usePaystackPayment } from "react-paystack";

interface Nominee {
  id: string;
  name: string;
  code: string;
  location: string;
  gender: "mr" | "miss";
  votes: number;
  photoUrl?: string;
  originalCategory?: string;
}

const REGION_DATA: Record<string, { title: string; subtitle: string; theme: any; nominees: Nominee[] }> = {
  mavoko: {
    title: "Mr & Miss Machakos - Mavoko",
    subtitle: "Representing Syokimau, Mlolongo, Athi River, and Mavoko Sub-County",
    theme: {
      avatarBg: "bg-rose-100 border-rose-200", avatarText: "text-rose-500", hoverBorder: "hover:border-rose-400", hoverShadow: "hover:shadow-[0_8px_30px_rgba(225,29,72,0.12)]", nameHover: "group-hover:text-rose-600", pillBg: "bg-slate-100 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600 group-hover:border-rose-200", arrowHover: "group-hover:text-rose-500"
    },
    nominees: [
      { id: "mvk-2", name: "Emmanuel Dennis", code: "MVK02", location: "Syokimau", gender: "mr", votes: 0, photoUrl: "/nominees/emmanuel-dennis.jpg", originalCategory: "mavoko" },
      { id: "mvk-3", name: "Brian Lokiridi", code: "MVK03", location: "Athi River", gender: "mr", votes: 0, photoUrl: "/nominees/brian-lokiridi.jpg", originalCategory: "mavoko" },
      { id: "mvk-4", name: "Abigael Mbula Kioko", code: "MVK04", location: "Mavoko", gender: "miss", votes: 0, photoUrl: "/nominees/abigael-mbula-kioko.jpg", originalCategory: "mavoko" },
      { id: "mvk-5", name: "Jemimah Mutuku Musenya", code: "MVK05", location: "Mlolongo / Mavoko", gender: "miss", votes: 0, photoUrl: "/nominees/jemimah-mutuku-musenya.jpg", originalCategory: "mavoko" },
      { id: "mvk-6", name: "Everlyne Musyoki", code: "MVK06", location: "Athi River", gender: "miss", votes: 0, photoUrl: "/nominees/everlyne-musyoki.jpg", originalCategory: "mavoko" },
      { id: "mvk-7", name: "Peggycate", code: "MVK07", location: "Kitengela / Mavoko", gender: "miss", votes: 0, photoUrl: "/nominees/peggycate.jpg", originalCategory: "mavoko" },
      { id: "mvk-8", name: "Stephanie Saiteyia", code: "MVK08", location: "Kitengela / Mavoko", gender: "miss", votes: 0, photoUrl: "/nominees/stephanie-saiteyia.jpg", originalCategory: "mavoko" },
      { id: "mvk-9", name: "Grace Wangui", code: "MVK09", location: "Mavoko", gender: "miss", votes: 0, photoUrl: "/nominees/grace-wangui.jpg", originalCategory: "mavoko" },
      { id: "mvk-10", name: "Bridget Wambui Mugo", code: "MVK10", location: "Mavoko", gender: "miss", votes: 0, photoUrl: "/nominees/bridget-wambui-mugo.jpg", originalCategory: "mavoko" },
      { id: "mvk-11", name: "Roseline Atieno Otieno", code: "MVK11", location: "Kitengela / Mavoko", gender: "miss", votes: 0, photoUrl: "/nominees/roseline-atieno-otieno.jpg", originalCategory: "mavoko" },
      { id: "mvk-12", name: "Chelsea Tanya", code: "MVK12", location: "Mavoko", gender: "miss", votes: 0, photoUrl: "/nominees/chelsea-tanya.jpg", originalCategory: "mavoko" },
      { id: "mvk-13", name: "Tonny Musembi", code: "MVK13", location: "Syokimau", gender: "mr", votes: 0, photoUrl: "/nominees/tonny-musembi.jpg", originalCategory: "mavoko" },
      { id: "mvk-14", name: "Emmanuel Noel", code: "MVK14", location: "Kitengela", gender: "mr", votes: 0, photoUrl: "/nominees/emmanuel-noel.jpg", originalCategory: "mavoko" },
      { id: "mvk-15", name: "Pashile Arsene", code: "MVK15", location: "Kitengela", gender: "mr", votes: 0, photoUrl: "/nominees/pashile-arsene.jpg", originalCategory: "mavoko" },
      { id: "mvk-16", name: "Josiah Lamo", code: "MVK16", location: "Mavoko", gender: "mr", votes: 0, photoUrl: "/nominees/josiah-lamo.jpg", originalCategory: "mavoko" }
    ]
  },
  township: {
    title: "Mr & Miss Machakos - Township",
    subtitle: "Representing Machakos Town, Machakos University, and Central Environs",
    theme: {
      avatarBg: "bg-amber-100 border-amber-200", avatarText: "text-amber-500", hoverBorder: "hover:border-amber-400", hoverShadow: "hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]", nameHover: "group-hover:text-amber-600", pillBg: "bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:border-amber-200", arrowHover: "group-hover:text-amber-500"
    },
    nominees: [
      { id: "twn-1", name: "Kennedy Muasa", code: "TWN01", location: "Machakos", gender: "mr", votes: 0, photoUrl: "/nominees/kennedy-muasa.jpg", originalCategory: "township" },
      { id: "twn-2", name: "Bruno Brook", code: "TWN02", location: "Machakos", gender: "mr", votes: 0, photoUrl: "/nominees/bruno-brook.jpg", originalCategory: "township" },
      { id: "twn-3", name: "Fidel Mutuku", code: "TWN03", location: "Machakos", gender: "mr", votes: 0, photoUrl: "/nominees/fidel-mutuku.jpg", originalCategory: "township" },
      { id: "twn-4", name: "Benjamin Kimanthi", code: "TWN04", location: "Machakos", gender: "mr", votes: 0, photoUrl: "/nominees/benjamin-kimanthi.jpg", originalCategory: "township" },
      { id: "twn-5", name: "Shalom Mwendwa", code: "TWN05", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/shalom-mwendwa.jpg", originalCategory: "township" },
      { id: "twn-6", name: "Marrion Atieno Juma", code: "TWN06", location: "Machakos University", gender: "miss", votes: 0, photoUrl: "/nominees/marrion-atieno-juma.jpg", originalCategory: "township" },
      { id: "twn-7", name: "Whitney Kwamboka", code: "TWN07", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/whitney-kwamboka.jpg", originalCategory: "township" },
      { id: "twn-8", name: "Reena Akinyi Odhiambo", code: "TWN08", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/reena-akinyi-odhiambo.jpg", originalCategory: "township" },
      { id: "twn-9", name: "Dorcas Kimeu Muuo", code: "TWN09", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/dorcas-kimeu-muuo.jpg", originalCategory: "township" },
      { id: "twn-10", name: "Claire Lucy Wanjiku", code: "TWN10", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/claire-lucy-wanjiku.jpg", originalCategory: "township" },
      { id: "twn-11", name: "Faith Jeptum", code: "TWN11", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/faith-jeptum.jpg", originalCategory: "township" },
      { id: "twn-12", name: "Rachael Kamutu Matheka", code: "TWN12", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/rachael-kamutu-matheka.jpg", originalCategory: "township" },
      { id: "twn-13", name: "Mutanu Mbuvi", code: "TWN13", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/mutanu-mbuvi.jpg", originalCategory: "township" },
      { id: "twn-14", name: "Mutuku Irene Mutindi", code: "TWN14", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/mutuku-irene-mutindi.jpg", originalCategory: "township" },
      { id: "twn-15", name: "Milan Njeri Murimi", code: "TWN15", location: "Machakos", gender: "miss", votes: 0, photoUrl: "/nominees/milan-njeri-murimi.jpg", originalCategory: "township" },
      { id: "twn-16", name: "Mevine Truphosa", code: "TWN16", location: "Machakos", gender: "miss", votes: 0, photoUrl: "/nominees/mevine-truphosa.jpg", originalCategory: "township" },
      { id: "twn-17", name: "Damaris Amina", code: "TWN17", location: "Joska / Machakos", gender: "miss", votes: 0, photoUrl: "/nominees/damaris-amina.jpg", originalCategory: "township" },
      { id: "twn-18", name: "Joy Bernita Kerubo", code: "TWN18", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/joy-bernita-kerubo.jpg", originalCategory: "township" },
      { id: "twn-19", name: "Maureen Wambui Karanja", code: "TWN19", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/maureen-wambui-karanja.jpg", originalCategory: "township" },
      { id: "twn-20", name: "Mitchell Omollo", code: "TWN20", location: "Machakos Town", gender: "miss", votes: 0, photoUrl: "/nominees/mitchell-omollo.jpg", originalCategory: "township" },
      { id: "twn-21", name: "Kylian Robert Wambua", code: "TWN21", location: "Machakos", gender: "mr", votes: 0, photoUrl: "/nominees/kylian-robert-wambua.jpg", originalCategory: "township" },
      { id: "twn-22", name: "Gloria Mumbua", code: "TWN22", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/gloria-mumbua.jpg", originalCategory: "township" },
      { id: "twn-23", name: "Almer Awino", code: "TWN23", location: "Machakos Township", gender: "miss", votes: 0, photoUrl: "/nominees/almer-awino.jpg", originalCategory: "township" },
      { id: "twn-24", name: "Mercy Kavuu", code: "TWN24", location: "Machakos", gender: "miss", votes: 0, photoUrl: "/nominees/mercy-kavuu.jpg", originalCategory: "township" },
      { id: "twn-25", name: "Vanessa Awour", code: "TWN25", location: "Machakos", gender: "miss", votes: 0, photoUrl: "/nominees/vanessa-awour.jpg", originalCategory: "township" },
      { id: "twn-26", name: "Alloys Chacha", code: "TWN26", location: "Machakos", gender: "mr", votes: 0, photoUrl: "/nominees/alloys-chacha.jpg", originalCategory: "township" },
      { id: "twn-27", name: "Angela Anselma Nzisa", code: "TWN27", location: "Machakos town", gender: "miss", votes: 0, photoUrl: "/nominees/angela-anselma-nzisa.jpg", originalCategory: "township" },
      { id: "twn-28", name: "Zora kinuthia", code: "TWN28", location: "Machakos", gender: "miss", votes: 0, photoUrl: "/nominees/zora-kinuthia.jpg", originalCategory: "township" }
    ]
  },
  diaspora: {
    title: "Mr & Miss Machakos - Diaspora",
    subtitle: "Representing Global & Countrywide Ambassadors Outside Machakos County",
    theme: {
      avatarBg: "bg-sky-100 border-sky-200", avatarText: "text-sky-500", hoverBorder: "hover:border-sky-400", hoverShadow: "hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]", nameHover: "group-hover:text-sky-600", pillBg: "bg-slate-100 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:border-sky-200", arrowHover: "group-hover:text-sky-500"
    },
    nominees: [
      { id: "dsp-1", name: "Yussuf Abubakar", code: "DSP01", location: "Nakuru", gender: "mr", votes: 0, photoUrl: "/nominees/yussuf-abubakar.jpg", originalCategory: "diaspora" },
      { id: "dsp-2", name: "Andrew Muema Muthyokavi", code: "DSP02", location: "Nairobi", gender: "mr", votes: 0, photoUrl: "/nominees/andrew-muema-muthyokavi.jpg", originalCategory: "diaspora" },
      { id: "dsp-3", name: "Obi Ifaenyi", code: "DSP03", location: "Mombasa", gender: "mr", votes: 0, photoUrl: "/nominees/obi-ifaenyi.jpg", originalCategory: "diaspora" },
      { id: "dsp-4", name: "Esther Odikara", code: "DSP04", location: "Nairobi", gender: "miss", votes: 0, photoUrl: "/nominees/esther-odikara.jpg", originalCategory: "diaspora" },
      { id: "dsp-5", name: "Adah Nabocho", code: "DSP05", location: "Nairobi", gender: "miss", votes: 0, photoUrl: "/nominees/adah-nabocho.jpg", originalCategory: "diaspora" },
      { id: "dsp-6", name: "Jennifer Simon", code: "DSP06", location: "Nairobi", gender: "miss", votes: 0, photoUrl: "/nominees/jennifer-simon.jpg", originalCategory: "diaspora" },
      { id: "dsp-7", name: "Beatrice Ingoka", code: "DSP07", location: "Nairobi", gender: "miss", votes: 0, photoUrl: "/nominees/beatrice-ingoka.jpg", originalCategory: "diaspora" },
      { id: "dsp-9", name: "Teresia Nduku", code: "DSP09", location: "Embakasi Central", gender: "miss", votes: 0, photoUrl: "/nominees/teresia-nduku.jpg", originalCategory: "diaspora" },
      { id: "dsp-10", name: "Sharon Ingasian", code: "DSP10", location: "Kahawa West", gender: "miss", votes: 0, photoUrl: "/nominees/sharon-ingasian.jpg", originalCategory: "diaspora" },
      { id: "dsp-11", name: "Miriam Monique", code: "DSP11", location: "Malindi", gender: "miss", votes: 0, photoUrl: "/nominees/miriam-monique.jpg", originalCategory: "diaspora" },
      { id: "dsp-12", name: "Ian Juma", code: "DSP12", location: "Kirinyaga", gender: "mr", votes: 0, photoUrl: "/nominees/ian-juma.jpg", originalCategory: "diaspora" },
      { id: "dsp-13", name: "BRILLIANT ATYANG", code: "DSP13", location: "Juja", gender: "miss", votes: 0, photoUrl: "/nominees/brilliant-atyang.jpg", originalCategory: "diaspora" },
      { id: "dsp-14", name: "Cosmus maithya", code: "DSP14", location: "Nairobi", gender: "mr", votes: 0, photoUrl: "/nominees/cosmus-maithya.jpg", originalCategory: "diaspora" },
      { id: "dsp-15", name: "Monique Miriam", code: "DSP15", location: "Lamu", gender: "miss", votes: 0, photoUrl: "/nominees/monique-miriam.jpg", originalCategory: "diaspora" },
      { id: "dsp-17", name: "Mereline khayati", code: "DSP17", location: "Nairobi", gender: "miss", votes: 0, photoUrl: "/nominees/mereline-khayati.jpg", originalCategory: "diaspora" },
      { id: "dsp-18", name: "Cecilia Wairimu", code: "DSP18", location: "KIAMBU", gender: "miss", votes: 0, photoUrl: "/nominees/cecilia-wairimu.jpg", originalCategory: "diaspora" },
      { id: "dsp-20", name: "Annet wanyagah", code: "DSP20", location: "Nairobi", gender: "miss", votes: 0, photoUrl: "/nominees/annet-wanyagah.jpg", originalCategory: "diaspora" },
      { id: "dsp-21", name: "Kelvin Ooltetia", code: "DSP21", location: "Narok", gender: "mr", votes: 0, photoUrl: "/nominees/kelvin-ooltetia.jpg", originalCategory: "diaspora" }
    ]
  },
  mwala: {
    title: "Mr & Miss Machakos - Mwala",
    subtitle: "Representing Mwala Sub-County and surrounding environs",
    theme: {
      avatarBg: "bg-emerald-100 border-emerald-200", avatarText: "text-emerald-500", hoverBorder: "hover:border-emerald-400", hoverShadow: "hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)]", nameHover: "group-hover:text-emerald-600", pillBg: "bg-slate-100 text-slate-500 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-200", arrowHover: "group-hover:text-emerald-500"
    },
    nominees: [
      { id: "mwl-1", name: "Cecilliah Nzilani", code: "MWL01", location: "Mwala", gender: "miss", votes: 0, photoUrl: "/nominees/cecilliah-nzilani.jpg", originalCategory: "mwala" },
      { id: "mwl-2", name: "Rabbeca Nduku Maingi", code: "MWL02", location: "Mwala", gender: "miss", votes: 0, photoUrl: "/nominees/rabbeca-nduku-maingi.jpg", originalCategory: "mwala" },
      { id: "mwl-3", name: "Darius Kaindi", code: "MWL03", location: "Mwala", gender: "mr", votes: 0, photoUrl: "/nominees/darius-kaindi.jpg", originalCategory: "mwala" },
      { id: "mwl-4", name: "Catherine Mutuku", code: "MWL04", location: "Mwala", gender: "miss", votes: 0, photoUrl: "/nominees/catherine-mutuku.jpg", originalCategory: "mwala" },
      { id: "mwl-5", name: "Diana Ndeda", code: "MWL05", location: "Mwala", gender: "miss", votes: 0, photoUrl: "/nominees/diana-ndeda.jpg", originalCategory: "mwala" },
      { id: "mwl-6", name: "Keziah Monicah Mutaiti", code: "MWL06", location: "Mwala", gender: "miss", votes: 0, photoUrl: "/nominees/keziah-monicah-mutaiti.jpg", originalCategory: "mwala" },
      { id: "mwl-7", name: "Trevis Kamau", code: "MWL07", location: "Mwala", gender: "mr", votes: 0, photoUrl: "/nominees/trevis-kamau.jpg", originalCategory: "mwala" },
      { id: "mwl-8", name: "Bradley Geoffrey", code: "MWL08", location: "Mwala", gender: "mr", votes: 0, photoUrl: "/nominees/bradley-geoffrey.jpg", originalCategory: "mwala" },
      { id: "mwl-9", name: "Zora Kinuthia", code: "MWL09", location: "Mwala", gender: "miss", votes: 0, photoUrl: "/nominees/zora-kinuthia.jpg", originalCategory: "mwala" }
    ]
  },
  kangundo: {
    title: "Mr & Miss Machakos - Kangundo",
    subtitle: "Representing Kangundo Sub-County and surrounding environs",
    theme: {
      avatarBg: "bg-purple-100 border-purple-200", avatarText: "text-purple-500", hoverBorder: "hover:border-purple-400", hoverShadow: "hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)]", nameHover: "group-hover:text-purple-600", pillBg: "bg-slate-100 text-slate-500 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:border-purple-200", arrowHover: "group-hover:text-purple-500"
    },
    nominees: [
      { id: "kan-1", name: "Praise Deborah Kithunga", code: "KAN01", location: "Kangundo", gender: "miss", votes: 0, photoUrl: "/nominees/praise-deborah-kithunga.jpg", originalCategory: "kangundo" },
      { id: "kan-2", name: "Joshua Kennedy", code: "KAN02", location: "Kangundo", gender: "mr", votes: 0, photoUrl: "/nominees/joshua-kennedy.jpg", originalCategory: "kangundo" },
      { id: "kan-3", name: "Winnie Mutheu", code: "KAN03", location: "Kangundo", gender: "miss", votes: 0, photoUrl: "/nominees/winnie-mutheu.jpg", originalCategory: "kangundo" },
      { id: "kan-4", name: "Margaret Wanja Mwangi", code: "KAN04", location: "Kangundo", gender: "miss", votes: 0, photoUrl: "/nominees/margaret-wanja-mwangi.jpg", originalCategory: "kangundo" },
      { id: "kan-5", name: "Kuki Japhet", code: "KAN05", location: "Kangundo", gender: "miss", votes: 0, photoUrl: "/nominees/kuki-japhet.jpg", originalCategory: "kangundo" },
      { id: "kan-6", name: "Gladys Ngatha", code: "KAN06", location: "Kangundo", gender: "miss", votes: 0, photoUrl: "/nominees/gladys-ngatha.jpg", originalCategory: "kangundo" },
      { id: "kan-7", name: "Joy Wanjeri", code: "KAN07", location: "Kangundo", gender: "miss", votes: 0, photoUrl: "/nominees/joy-wanjeri-real.jpg", originalCategory: "kangundo" },
      { id: "kan-8", name: "Tracy Sitatian", code: "KAN08", location: "Kangundo", gender: "miss", votes: 0, photoUrl: "/nominees/tracy-sitatian.jpg", originalCategory: "kangundo" },
      { id: "kan-9", name: "Rama Hassan", code: "KAN09", location: "Kangundo", gender: "mr", votes: 0, photoUrl: "/nominees/rama-hassan.jpg", originalCategory: "kangundo" }
    ]
  },
  environs: {
    title: "Mr & Miss Machakos - Environs",
    subtitle: "Representing Top Candidates (100+ Votes) & Environs Regions",
    theme: {
      avatarBg: "bg-teal-100 border-teal-200", avatarText: "text-teal-500", hoverBorder: "hover:border-teal-400", hoverShadow: "hover:shadow-[0_8px_30px_rgba(20,184,166,0.12)]", nameHover: "group-hover:text-teal-600", pillBg: "bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-200", arrowHover: "group-hover:text-teal-500"
    },
    nominees: [
      { id: "env-1", name: "Kelvin", code: "ENV01", location: "Nairobi / Mlolongo", gender: "mr", votes: 0, photoUrl: "/nominees/kelvin.jpg", originalCategory: "environs" },
      { id: "env-2", name: "Samuel Karingithi Kagiri", code: "ENV02", location: "Aguthi", gender: "mr", votes: 0, photoUrl: "/nominees/samuel-karingithi-kagiri.jpg", originalCategory: "environs" },
      { id: "env-3", name: "Glorious Nyakara", code: "ENV03", location: "Kenanie", gender: "miss", votes: 0, photoUrl: "/nominees/glorious-nyakara.jpg", originalCategory: "environs" },
      { id: "env-4", name: "Damaris Helen Akoth", code: "ENV04", location: "Eldoret", gender: "miss", votes: 0, photoUrl: "/nominees/damaris-helen-akoth.jpg", originalCategory: "environs" },
      { id: "env-5", name: "Daissy Anne Ogot", code: "ENV05", location: "Kakamega", gender: "miss", votes: 0, photoUrl: "/nominees/daissy-anne-ogot.jpg", originalCategory: "environs" },
      { id: "env-6", name: "Boniface Kipngetich", code: "ENV06", location: "Nairobi", gender: "mr", votes: 0, photoUrl: "/nominees/boniface-kipngetich.jpg", originalCategory: "environs" },
      { id: "env-7", name: "Mereline Khayati", code: "ENV07", location: "Nairobi", gender: "miss", votes: 0, photoUrl: "/nominees/mereline-khayati.jpg", originalCategory: "environs" },
      { id: "env-8", name: "Sherleen Jepkoech", code: "ENV08", location: "Nairobi", gender: "miss", votes: 0, photoUrl: "/nominees/sherleen-jepkoech.jpg", originalCategory: "environs" },
      { id: "env-9", name: "Wilson Muange Kyalo", code: "ENV09", location: "Machakos Athi River", gender: "mr", votes: 0, photoUrl: "/nominees/wilson-muange-kyalo.jpg", originalCategory: "environs" },
      { id: "env-10", name: "Albert Otieno", code: "ENV10", location: "Nairobi", gender: "mr", votes: 0, photoUrl: "/nominees/albert-otieno.jpg", originalCategory: "environs" },
      { id: "env-11", name: "Allan Otieno Omondi", code: "ENV11", location: "Machakos", gender: "mr", votes: 0, photoUrl: "/nominees/allan-otieno-omondi.jpg", originalCategory: "environs" },
      { id: "env-12", name: "Emmanuel Ochieng Japheth", code: "ENV12", location: "Nairobi, Kahawa West", gender: "mr", votes: 0, photoUrl: "/nominees/emmanuel-ochieng-japheth.jpg", originalCategory: "environs" },
      { id: "env-13", name: "Isaac Muuo Siloni", code: "ENV13", location: "Kalama", gender: "mr", votes: 0, photoUrl: "/nominees/isaac-muuo-siloni.jpg", originalCategory: "environs" },
      { id: "env-14", name: "Brian Mwema", code: "ENV14", location: "Machakos Township", gender: "mr", votes: 0, photoUrl: "/nominees/brian-mwema.jpg", originalCategory: "environs" },
      { id: "env-15", name: "Diana Neema", code: "ENV15", location: "Kalama", gender: "miss", votes: 0, photoUrl: "/nominees/diana-neema.jpg", originalCategory: "environs" },
      { id: "env-16", name: "Victor Mwangi Kahenia", code: "ENV16", location: "Masinga", gender: "mr", votes: 0, photoUrl: "/nominees/victor-mwangi-kahenia.jpg", originalCategory: "environs" },
      { id: "env-17", name: "Mirriam Mutheu Kiio", code: "ENV17", location: "Kathama Subcounty", gender: "miss", votes: 0, photoUrl: "/nominees/mirriam-mutheu-kiio.jpg", originalCategory: "environs" },
      { id: "env-18", name: "Stephen Gekonge", code: "ENV18", location: "Machakos", gender: "mr", votes: 0, photoUrl: "/nominees/stephen-gekonge.jpg", originalCategory: "environs" },
      { id: "env-19", name: "Jasmine Waithira Natalyia", code: "ENV19", location: "Masinga", gender: "miss", votes: 0, photoUrl: "/nominees/jasmine-waithira-natalyia.jpg", originalCategory: "environs" }
    ]
  },
  popularity: {
    title: "Mr & Miss Popularity",
    subtitle: "The most popular delegates across eligible regions",
    theme: {
      avatarBg: "bg-pink-100 border-pink-200", avatarText: "text-pink-500", hoverBorder: "hover:border-pink-400", hoverShadow: "hover:shadow-[0_8px_30px_rgba(236,72,153,0.12)]", nameHover: "group-hover:text-pink-600", pillBg: "bg-slate-100 text-slate-500 group-hover:bg-pink-50 group-hover:text-pink-600 group-hover:border-pink-200", arrowHover: "group-hover:text-pink-500"
    },
    nominees: [] 
  }
};

const ALL_NOMINEES = [
  ...REGION_DATA.mavoko.nominees,
  ...REGION_DATA.township.nominees,
  ...REGION_DATA.diaspora.nominees,
  ...REGION_DATA.mwala.nominees,
  ...REGION_DATA.kangundo.nominees,
  ...REGION_DATA.environs.nominees
];

export default function RegionVotingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const rawRegion = typeof params?.region === "string" ? params.region.toLowerCase() : "mavoko";
  
  const currentRegion = rawRegion.includes("township") ? "township" 
                      : rawRegion.includes("diaspora") ? "diaspora" 
                      : rawRegion.includes("mwala") ? "mwala"
                      : rawRegion.includes("kangundo") ? "kangundo"
                      : rawRegion.includes("environs") ? "environs"
                      : rawRegion.includes("popularity") ? "popularity"
                      : "mavoko";
                      
  const data = REGION_DATA[currentRegion];

  const [activeTab, setActiveTab] = useState<"mr" | "miss">("miss");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNominee, setSelectedNominee] = useState<Nominee | null>(null);
  const [liveNominees, setLiveNominees] = useState<Nominee[]>([]);
  
  const posterRef = useRef<HTMLDivElement>(null);

  // Form State
  const [voteCount, setVoteCount] = useState<number | string>(10);
  const [cardAmount, setCardAmount] = useState<number | string>(10);
  const [cardCurrency, setCardCurrency] = useState<"USD" | "KES">("USD"); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState(""); 
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [selectedCard, setSelectedCard] = useState<"visa" | "mastercard" | "amex">("visa");
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const VOTE_COST_KES = 10;
  
  const safeVoteCount = typeof voteCount === 'number' ? voteCount : (parseInt(voteCount) || 1);
  const mpesaTotalCost = safeVoteCount * VOTE_COST_KES;
  const safeCardAmount = typeof cardAmount === 'number' ? cardAmount : (parseInt(cardAmount) || 0);

  // PAYSTACK CONFIGURATION
  const exchangeRate = 130; 
  const finalAmountKES = cardCurrency === "USD" ? safeCardAmount * exchangeRate : safeCardAmount;

  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: email, 
    amount: finalAmountKES * 100, 
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    currency: "KES",
    metadata: {
      custom_fields: [
        { display_name: "Nominee Name", variable_name: "nominee_name", value: selectedNominee?.name || "" },
        { display_name: "Nominee Code", variable_name: "nominee_code", value: selectedNominee?.code || "" },
      ]
    }
  };

  const initializePaystackPayment = usePaystackPayment(paystackConfig);

  useEffect(() => {
    const fetchLiveVotes = async () => {
      try {
        const res = await fetch('/api/dashboard', { 
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
        });
        const dbData = await res.json();
        
        if (dbData.success && dbData.nominees) {
          
          const updatedGlobalList = ALL_NOMINEES.map(nom => {
            const dbMatch = dbData.nominees.find((n: any) => n.code.toUpperCase() === nom.code.toUpperCase());
            return { ...nom, votes: dbMatch ? dbMatch.votes : 0, photoUrl: dbMatch?.photoUrl || nom.photoUrl };
          });

          let displayList: Nominee[] = [];

          if (currentRegion === "popularity") {
            displayList = updatedGlobalList
              .filter(nom => nom.votes >= 500)
              .map(nom => ({ ...nom, votes: nom.votes - 500 })); 

          } else if (currentRegion === "environs") {
            // ENVIRONS (Silver Tier): 19 original < 500 PLUS anyone 100-499 PLUS Special Passes
            displayList = updatedGlobalList.filter(nom => {
              const isOriginalEnvirons = nom.originalCategory === "environs";
              const isSpecialPass = nom.code === "KAN04" || nom.code === "KAN07"; // Margaret & Joy VIP Pass
              
              if (isOriginalEnvirons || isSpecialPass) {
                return nom.votes < 500;
              } else {
                return nom.votes >= 100 && nom.votes < 500;
              }
            });

          } else {
            // REGIONAL (Base Tier): Only original category members with < 100 votes (excluding special passes)
            displayList = updatedGlobalList.filter(nom => {
              const isSpecialPass = nom.code === "KAN04" || nom.code === "KAN07";
              return nom.originalCategory === currentRegion && nom.votes < 100 && !isSpecialPass;
            });
          }

          setLiveNominees(displayList);

          setSelectedNominee(prev => {
            if (!prev) return prev;
            const updated = displayList.find(n => n.code === prev.code);
            return updated || prev;
          });
        }
      } catch (error) {
        console.error("Failed to fetch live votes", error);
      }
    };

    fetchLiveVotes();
    const interval = setInterval(fetchLiveVotes, 15000);
    return () => clearInterval(interval);
  }, [currentRegion]);

  useEffect(() => {
    const nomineeCode = searchParams?.get('nominee');
    if (nomineeCode && liveNominees.length > 0) {
      const found = liveNominees.find(n => n.code.toUpperCase() === nomineeCode.toUpperCase());
      if (found) {
        setSelectedNominee(found);
        setActiveTab(found.gender);
      }
    }
  }, [searchParams, liveNominees]);

  const filteredNominees = liveNominees.filter((nom) => {
    const matchesGender = nom.gender === activeTab;
    const matchesSearch = nom.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          nom.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nom.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGender && matchesSearch;
  });

  const handleVoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNominee) return;

    if (paymentMethod === "card") {
      if (!email) return alert("Please enter your email address for the payment receipt.");
      if (safeCardAmount <= 0) return alert("Please enter a valid amount.");
      
      initializePaystackPayment({
        onSuccess: async (reference: any) => {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                reference: reference.reference,
                nomineeCode: selectedNominee?.code,
                votes: safeVoteCount
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentSuccess(true);
              setTimeout(() => {
                setPaymentSuccess(false);
                closeModal();
                router.refresh();
              }, 4000);
            } else {
              alert("Payment was successful, but vote logging failed: " + verifyData.error);
            }
          } catch (err) {
            console.error("Error verifying payment on backend:", err);
          }
        },
        onClose: () => {}
      });
      return;
    }

    if (!phoneNumber) return alert("Please enter a valid M-Pesa phone number");
    setIsProcessing(true);

    try {
      const response = await fetch('/api/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: mpesaTotalCost,
          nomineeId: selectedNominee.code,
          nomineeName: selectedNominee.name,
          votes: safeVoteCount
        })
      });

      const resData = await response.json();

      if (resData.success) {
        setPaymentSuccess(true);
        setTimeout(() => {
          setPaymentSuccess(false);
          closeModal();
          router.refresh();
        }, 6000); 
      } else {
        alert("Payment initialization failed: " + (resData.error || "Please verify your credentials and try again."));
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong connecting to M-Pesa. Please check your internet connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = () => {
    if (!selectedNominee) return;
    const url = `${window.location.origin}${window.location.pathname}?nominee=${selectedNominee.code}`;
    navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleDownloadPoster = async () => {
    if (!posterRef.current || !selectedNominee) return;
    
    try {
      const dataUrl = await htmlToImage.toJpeg(posterRef.current, { 
        quality: 0.95,
        backgroundColor: '#020617' 
      });
      download(dataUrl, `${selectedNominee.name.replace(/\s+/g, '_')}_JMA_Voting_Poster.jpg`);
    } catch (err) {
      console.error('Error downloading poster:', err);
      alert("Oops! Something went wrong while saving the poster. Please try again.");
    }
  };

  const closeModal = () => {
    setSelectedNominee(null);
    setPhoneNumber("");
    setEmail(""); 
    setVoteCount(10);
    setCardAmount(10);
    setCardCurrency("USD");
    setPaymentMethod("mpesa");
    router.replace(`/voting/${currentRegion}`, { scroll: false });
  };

  return (
    <main className="relative min-h-screen flex flex-col w-full bg-slate-50 text-slate-900 overflow-x-hidden">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/main-bg.jpg" alt="Background" className="fixed inset-0 w-full h-screen object-cover object-center" />
        <div className="fixed inset-0 bg-slate-50/90 backdrop-blur-sm" /> 
      </div>

      <Navbar />

      <section className="relative pt-32 pb-16 px-6 overflow-hidden z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link 
            href="/voting" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors text-xs font-bold uppercase tracking-widest mb-6 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> All Categories
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
            <div>
              <span className="inline-block text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 drop-shadow-sm">
                Official Juron Pageant Portal
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2">
                {data.title}
              </h1>
              <p className="text-slate-600 text-sm max-w-xl font-medium">
                {data.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              
              <Link 
                href="/voting/portal" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-md whitespace-nowrap"
              >
                <User className="w-4 h-4" /> Nominee Login
              </Link>

              <div className="relative w-full sm:min-w-[260px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search nominee..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-full py-3 pl-11 pr-4 text-xs text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setActiveTab("miss")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "miss" 
                  ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-[0_5px_15px_rgba(225,29,72,0.3)] scale-105 border border-rose-500" 
                  : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm"
              }`}
            >
              <Crown className="w-4 h-4" /> Miss ({liveNominees.filter(n => n.gender === "miss").length})
            </button>

            <button
              onClick={() => setActiveTab("mr")}
              className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "mr" 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-[0_5px_15px_rgba(245,158,11,0.3)] scale-105 border border-amber-500" 
                  : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 shadow-sm"
              }`}
            >
              <Crown className="w-4 h-4" /> Mr ({liveNominees.filter(n => n.gender === "mr").length})
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 relative z-10 max-w-4xl mx-auto w-full flex-grow">
        {filteredNominees.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <Crown className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {currentRegion === "popularity" ? "No One Has Reached 500 Votes Yet" 
              : currentRegion === "environs" ? "No Nominees Found"
              : "All nominees have advanced!"}
            </h3>
            {currentRegion === "popularity" && (
              <p className="text-sm text-slate-500 font-medium">Keep voting in other categories to unlock nominees here!</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredNominees.map((nominee) => (
              <div 
                key={nominee.id}
                onClick={() => {
                  setSelectedNominee(nominee);
                  router.push(`?nominee=${nominee.code}`, { scroll: false });
                }}
                className={`group cursor-pointer bg-white border border-slate-200 ${data.theme.hoverBorder} rounded-2xl flex items-center justify-between transition-all duration-300 shadow-sm ${data.theme.hoverShadow} hover:-translate-y-1 overflow-hidden`}
              >
                <div className="flex items-center gap-4 p-4 md:p-5">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${data.theme.avatarBg} flex items-center justify-center border overflow-hidden flex-shrink-0 transition-colors`}>
                     {nominee.photoUrl ? (
                        <img src={nominee.photoUrl} alt={nominee.name} className="w-full h-full object-cover object-top" />
                      ) : (
                        <User className={`w-5 h-5 md:w-6 md:h-6 ${data.theme.avatarText}`} />
                      )}
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-serif font-bold text-base md:text-lg text-slate-900 ${data.theme.nameHover} transition-colors line-clamp-1`}>{nominee.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-transparent transition-colors ${data.theme.pillBg}`}>#{nominee.code}</span>
                      <span className="text-xs text-slate-500 font-medium truncate">{nominee.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pl-4 pr-5 py-4 md:py-5 border-l border-slate-100 bg-slate-50/50 transition-colors h-full">
                  <div className="text-right hidden xs:block">
                    <span className="block text-slate-900 font-bold text-lg leading-tight">{nominee.votes}</span>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Votes</span>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-slate-400 ${data.theme.arrowHover} transition-transform group-hover:translate-x-1`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedNominee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white border border-slate-100 rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden my-auto">
            
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 text-slate-400 hover:text-slate-900 bg-white/90 backdrop-blur p-2 rounded-full border border-slate-200 shadow-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full md:w-1/2 bg-slate-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 relative">
              <div 
                ref={posterRef}
                className="relative aspect-[3/4] w-full max-w-[320px] bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 flex flex-col justify-between p-5 overflow-hidden border border-slate-800 rounded-2xl shadow-xl"
              >
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-3 py-1.5 rounded-md tracking-widest uppercase">
                    #{selectedNominee.code}
                  </span>
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" /> JMA 2026
                  </span>
                </div>

                <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center mt-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 p-1 shadow-xl mb-4">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                      {selectedNominee.photoUrl ? (
                        <img src={selectedNominee.photoUrl} alt={selectedNominee.name} className="w-full h-full object-cover object-top" />
                      ) : (
                        <span className="font-serif font-black text-4xl text-amber-400">
                          {selectedNominee.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs tracking-[0.2em] uppercase font-bold text-amber-400/90 drop-shadow mb-1">
                    Official Nominee
                  </span>
                  <h3 className="text-white font-serif font-bold text-2xl tracking-tight leading-tight px-2">
                    {selectedNominee.name}
                  </h3>
                </div>

                <div className="relative z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-3 text-center mt-4">
                  <p className="text-xs text-slate-300 font-medium uppercase tracking-widest">
                    {data.title}
                  </p>
                  <p className="text-[10px] text-amber-400 font-bold uppercase mt-1">
                    Vote at juronmodels.co.ke
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6 w-full max-w-[320px]">
                <button 
                  onClick={handleShare}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  {shareCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  {shareCopied ? "Copied!" : "Copy Link"}
                </button>
                <button 
                  onClick={handleDownloadPoster}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Save
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center relative bg-white">
              {paymentSuccess ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-slate-900 mb-2">Check Your Phone!</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                    An M-Pesa prompt has been sent to your phone. Enter your PIN to confirm {safeVoteCount} votes for <span className="text-amber-600 font-bold">{selectedNominee.name}</span>.
                  </p>
                  <button onClick={closeModal} className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-700 underline underline-offset-4">
                    Return to Nominees
                  </button>
                </div>
              ) : (
                <form onSubmit={handleVoteSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-1">Cast Your Vote</h3>
                    <p className="text-xs text-slate-500 font-medium">Securely support {selectedNominee.name}.</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Select Payment Method:
                    </label>
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("mpesa")}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-bold text-xs uppercase tracking-widest transition-all ${
                          paymentMethod === "mpesa"
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                            : "border-slate-200 bg-white text-slate-500 hover:border-emerald-200 hover:bg-emerald-50"
                        }`}
                      >
                        <Smartphone className="w-4 h-4" /> M-Pesa
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-bold text-xs uppercase tracking-widest transition-all ${
                          paymentMethod === "card"
                            ? "border-[#0BA4DB] bg-[#0BA4DB]/10 text-[#0BA4DB] shadow-sm"
                            : "border-slate-200 bg-white text-slate-500 hover:border-[#0BA4DB]/30 hover:bg-[#0BA4DB]/5"
                        }`}
                      >
                        <CreditCard className="w-4 h-4" /> Card
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "mpesa" ? (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Select Vote Bundle:
                        </label>
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {[1, 5, 10, 50].map((qty) => (
                            <button
                              type="button"
                              key={qty}
                              onClick={() => setVoteCount(qty)}
                              className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                                safeVoteCount === qty 
                                  ? "bg-amber-400 text-slate-900 border-amber-400 shadow-md" 
                                  : "bg-white text-slate-600 border-slate-200 hover:border-amber-300 shadow-sm"
                              }`}
                            >
                              +{qty}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-sm">
                          <span className="text-xs text-slate-600 font-bold ml-2">Custom Amount:</span>
                          <div className="flex items-center gap-2">
                            <button 
                              type="button" 
                              onClick={() => setVoteCount(Math.max(1, safeVoteCount - 1))}
                              className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors shadow-sm"
                            >
                              -
                            </button>
                            
                            <input
                              type="number"
                              min="1"
                              value={voteCount}
                              onChange={(e) => {
                                const val = e.target.value;
                                setVoteCount(val === "" ? "" : Math.max(1, parseInt(val) || 1));
                              }}
                              onBlur={() => {
                                if (!voteCount) setVoteCount(1);
                              }}
                              className="font-mono font-bold text-lg text-amber-600 w-16 text-center bg-transparent border-none focus:outline-none focus:ring-0 p-0"
                            />

                            <button 
                              type="button" 
                              onClick={() => setVoteCount(safeVoteCount + 1)}
                              className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center transition-colors shadow-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                          M-Pesa Phone Number:
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="tel" 
                            placeholder="0712345678"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full bg-white border border-slate-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none transition-all"
                            required={paymentMethod === "mpesa"}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      
                      <div className="mb-4">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Email Address (Required):
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email for receipt"
                          className="w-full bg-white border border-slate-200 focus:border-[#0BA4DB] focus:ring-2 focus:ring-[#0BA4DB]/20 rounded-xl py-3 px-4 text-sm font-medium text-slate-900 shadow-sm focus:outline-none transition-all"
                          required={paymentMethod === "card"}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Enter Amount:
                          </label>
                          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <button
                              type="button"
                              onClick={() => setCardCurrency("USD")}
                              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                                cardCurrency === "USD" ? "bg-white text-[#0BA4DB] shadow-sm" : "text-slate-500 hover:text-slate-900"
                              }`}
                            >
                              USD ($)
                            </button>
                            <button
                              type="button"
                              onClick={() => setCardCurrency("KES")}
                              className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all ${
                                cardCurrency === "KES" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                              }`}
                            >
                              KES
                            </button>
                          </div>
                        </div>

                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                            {cardCurrency === "USD" ? "$" : "KES"}
                          </span>
                          <input 
                            type="number" 
                            min={cardCurrency === "USD" ? "1" : "10"}
                            placeholder={cardCurrency === "USD" ? "10" : "100"}
                            value={cardAmount}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCardAmount(val === "" ? "" : Math.max(0, parseInt(val) || 0));
                            }}
                            className="w-full bg-white border border-slate-200 focus:border-[#0BA4DB] focus:ring-2 focus:ring-[#0BA4DB]/20 rounded-xl py-3.5 pl-16 pr-4 text-sm font-mono font-bold text-slate-900 shadow-sm focus:outline-none transition-all"
                            required={paymentMethod === "card"}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                          Select Card Type:
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedCard("visa")}
                            className={`py-2 px-3 rounded-xl border transition-all flex items-center justify-center bg-white ${
                              selectedCard === "visa" ? "border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20" : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <span className="font-sans font-black text-sm italic text-[#1434CB] tracking-tighter">VISA</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedCard("mastercard")}
                            className={`py-2 px-3 rounded-xl border transition-all flex items-center justify-center bg-white ${
                              selectedCard === "mastercard" ? "border-orange-500 bg-orange-50/50 shadow-sm ring-2 ring-orange-500/20" : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex relative w-8 h-4 items-center justify-center">
                              <div className="absolute left-0 w-4 h-4 rounded-full bg-[#EA001B]" />
                              <div className="absolute right-0 w-4 h-4 rounded-full bg-[#FFA200] opacity-80 mix-blend-multiply" />
                            </div>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedCard("amex")}
                            className={`py-2 px-3 rounded-xl border transition-all flex items-center justify-center bg-white ${
                              selectedCard === "amex" ? "border-cyan-600 bg-cyan-50/50 shadow-sm ring-2 ring-cyan-500/20" : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <div className="bg-[#2E77BB] text-white px-1 py-0.5 rounded-sm font-bold text-[9px] tracking-widest">
                              AMEX
                            </div>
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 text-center px-1">
                        Secured by Paystack for global card processing.
                      </p>
                    </div>
                  )}

                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-4 px-1">
                      <span className="text-sm text-slate-600 font-bold">Total Cost:</span>
                      <span className="text-xl font-serif font-black text-amber-500 drop-shadow-sm">
                        {paymentMethod === "mpesa" 
                          ? `KES ${mpesaTotalCost.toLocaleString()}` 
                          : cardCurrency === "USD" 
                            ? `$${safeCardAmount.toLocaleString()} USD` 
                            : `KES ${safeCardAmount.toLocaleString()}`}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`w-full py-4 rounded-xl text-white font-bold text-sm uppercase tracking-widest transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${
                        paymentMethod === "mpesa" 
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 shadow-[0_5px_15px_rgba(16,185,129,0.3)]"
                          : "bg-[#0F1611] hover:bg-[#0BA4DB]"
                      }`}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                        </>
                      ) : paymentMethod === "mpesa" ? (
                        <>
                          <Smartphone className="w-4 h-4" /> Pay KES {mpesaTotalCost.toLocaleString()} via M-Pesa
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" /> Pay {cardCurrency === "USD" ? `$${safeCardAmount.toLocaleString()} USD` : `KES ${safeCardAmount.toLocaleString()}`} via Card
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}