import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import GuideHelpBanner from "@/components/GuideHelpBanner";

const TOPICS = [
  {
    href: "/guide/start",
    icon: "🗺️",
    title: "सुरुवात कशी करावी?",
    desc: "नियोजन, जागा, चारा, बजेट आणि ६ महिन्यांचा रोडमॅप",
  },
  {
    href: "/guide/general",
    icon: "📈",
    title: "अजून सुधारणा कशी करावी?",
    desc: "जातीची निवड, व्यवसायाचे प्रकार",
  },
  {
    href: "/guide/schemes",
    icon: "🏛️",
    title: "सरकारी अनुदान योजना",
    desc: "किती अनुदान, कागदपत्रं आणि अर्जाच्या सोप्या स्टेप्स",
  },
  {
    href: "/guide/feed",
    icon: "🌾",
    title: "खुराक - वयानुसार आहार",
    desc: "पिल्लू ते प्रौढ शेळीपर्यंत किती आणि काय खायला द्यावं",
  },
  {
    href: "/guide/shed",
    icon: "🏠",
    title: "गोठा/शेड कसा बांधावा",
    desc: "कमी खर्चात, कमीत कमी रोजच्या कामात टिकणारा गोठा",
  },
  {
    href: "/guide/videos",
    icon: "🎥",
    title: "व्हिडिओ मार्गदर्शन",
    desc: "मराठीतले उपयुक्त युट्युब व्हिडिओ - संदर्भासाठी",
  },
];

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Breadcrumb items={[{ label: "मार्गदर्शन" }]} />

      <section className="bg-gradient-to-br from-amber-700 to-amber-600 text-white rounded-2xl px-5 py-6 shadow-md">
        <h1 className="text-xl font-bold mb-1">📚 शेळीपालन मार्गदर्शन</h1>
        <p className="text-amber-50 text-sm">
          फक्त शेळ्या असणं पुरेसं नाही - योग्य खुराक, चांगला निवारा आणि
          व्यवसायाची माहिती असेल तर शेळीपालनातून जास्त फायदा मिळतो. खाली
          दिलेले विषय वाचा.
        </p>
      </section>

      <GuideHelpBanner />

      <div className="grid sm:grid-cols-2 gap-4">
        {TOPICS.map((topic) => (
          <Link
            key={topic.href}
            href={topic.href}
            className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <p className="text-3xl mb-2">{topic.icon}</p>
            <p className="font-semibold text-stone-800 mb-1">{topic.title}</p>
            <p className="text-sm text-stone-500">{topic.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
