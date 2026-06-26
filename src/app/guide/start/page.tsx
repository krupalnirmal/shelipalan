import Breadcrumb from "@/components/Breadcrumb";
import GuideSection from "@/components/GuideSection";
import GuideHelpBanner from "@/components/GuideHelpBanner";

const ROADMAP = [
  {
    month: "महिना १",
    points: ["जागा निश्चित करा", "चारा लावायला सुरुवात करा", "शेडचं डिझाइन तयार करा"],
  },
  {
    month: "महिना २-३",
    points: ["शेड बांधा", "कुंपण आणि पाण्याची व्यवस्था पूर्ण करा"],
  },
  {
    month: "महिना ४",
    points: ["फीडर, पाण्याची भांडी, औषधं तयार ठेवा", "विश्वासनीय शेतातून शेळ्या बुक करा"],
  },
  {
    month: "महिना ५",
    points: ["शेळ्या आणा", "१५ दिवस निरीक्षण (Quarantine) करा"],
  },
  {
    month: "महिना ६",
    points: ["नियमित आहार, लसीकरण आणि नोंदी ठेवण्यास सुरुवात करा"],
  },
];

export default function GuideStartPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Breadcrumb
        items={[
          { label: "मार्गदर्शन", href: "/guide" },
          { label: "सुरुवात कशी करावी" },
        ]}
      />
      <h1 className="text-2xl font-bold text-stone-800">
        🗺️ शेळीपालन सुरू करण्यापूर्वीचं नियोजन
      </h1>
      <p className="text-sm text-stone-500">
        शेळ्या आणण्याआधी योग्य नियोजन केलं, तर नंतरचा खर्च आणि जोखीम दोन्ही
        कमी होतात.
      </p>

      <GuideSection title="१. उद्दिष्ट ठरवा">
        <p>सुरुवातीलाच ठरवा:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>मटणासाठी शेळीपालन करायचं?</li>
          <li>प्रजनन (Breeding) करायचं?</li>
          <li>की दोन्ही?</li>
        </ul>
        <p>बहुतेक नवीन शेतकऱ्यांसाठी Breeding + Meat हा चांगला पर्याय असतो.</p>
      </GuideSection>

      <GuideSection title="२. जागेची निवड">
        <ul className="list-disc pl-5 space-y-1">
          <li>उंच जागा निवडा.</li>
          <li>पाणी साचणार नाही याची खात्री करा.</li>
          <li>रस्ता जवळ असावा.</li>
          <li>वीज आणि पाण्याची सुविधा असावी.</li>
        </ul>
      </GuideSection>

      <GuideSection title="३. चाऱ्याचे नियोजन (सर्वात महत्त्वाचे)">
        <p>शेळ्या आणण्याच्या २-३ महिने आधी चारा तयार करा:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>नेपियर (CO-4/CO-5)</li>
          <li>मका</li>
          <li>ज्वारी</li>
          <li>लुसर्न (हिरवा चारा)</li>
          <li>सुबाभूळ किंवा ग्लिरिसिडिया सारखी झाडे</li>
        </ul>
        <p>
          कमीत कमी १ एकर जमीन चाऱ्यासाठी राखून ठेवा (२०-२५ शेळ्यांसाठी).
        </p>
      </GuideSection>

      <GuideSection title="४. शेड आधी तयार करा">
        <p>शेळ्या आणण्यापूर्वी हे पूर्ण असावं:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>शेड पूर्ण</li>
          <li>पाण्याची टाकी</li>
          <li>फीडर</li>
          <li>पाण्याची भांडी</li>
          <li>कुंपण</li>
        </ul>
        <p className="text-stone-500">
          शेड कसं बांधावं याची सविस्तर माहिती{" "}
          <a href="/guide/shed" className="text-green-700 font-semibold underline">
            गोठा/शेड पेजवर
          </a>{" "}
          वाचा.
        </p>
      </GuideSection>

      <GuideSection title="५. कोणती जात घ्यायची?">
        <p>महाराष्ट्रासाठी चांगल्या जाती:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>उस्मानाबादी (Osmanabadi)</li>
          <li>सिरोही (Sirohi)</li>
          <li>बीटल (Beetal)</li>
        </ul>
        <p>सुरुवातीला एकाच जातीच्या शेळ्या घ्या.</p>
      </GuideSection>

      <GuideSection title="६. किती शेळ्यांपासून सुरुवात करावी?">
        <p>पहिल्या वर्षी:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>२० माद्या</li>
          <li>१ चांगला बोकड</li>
        </ul>
        <p className="font-medium text-amber-700">
          एकदम ५०-१०० शेळ्या घेऊ नका.
        </p>
      </GuideSection>

      <GuideSection title="७. पशुवैद्यकीय तयारी">
        <ul className="list-disc pl-5 space-y-1">
          <li>जवळचा पशुवैद्य शोधून ठेवा.</li>
          <li>लसीकरणाचं वेळापत्रक तयार ठेवा.</li>
          <li>जंतनाशक औषधांचा प्लॅन करा.</li>
        </ul>
      </GuideSection>

      <GuideSection title="८. बाजारपेठ आधी ठरवा">
        <p>शेळ्या विकायच्या कुठे?</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>स्थानिक व्यापारी (खातिक)</li>
          <li>बकरी ईदचा बाजार</li>
          <li>हॉटेल्स</li>
          <li>थेट ग्राहक - याचसाठी या वेबसाईटवर एंट्री टाकून ठेवा</li>
        </ul>
        <p>बाजार आधी ठरवला तर विक्री सोपी होते.</p>
      </GuideSection>

      <GuideSection title="९. खर्चाचा साधा अंदाज (२०-२१ शेळ्यांसाठी)">
        <ul className="list-disc pl-5 space-y-1">
          <li>शेड: ₹२-३ लाख</li>
          <li>२० माद्या + १ बोकड: ₹२.५-४ लाख (जात आणि वयानुसार)</li>
          <li>फीडर, पाण्याची व्यवस्था, औषधं: ₹५०,०००-₹१ लाख</li>
          <li>चारा लागवड: ₹२०,०००-₹५०,०००</li>
        </ul>
      </GuideSection>

      <GuideSection title="१०. ६ महिन्यांचा रोडमॅप">
        <div className="space-y-3">
          {ROADMAP.map((r) => (
            <div key={r.month} className="flex gap-3">
              <span className="flex-shrink-0 w-20 font-semibold text-green-700">
                {r.month}
              </span>
              <ul className="list-disc pl-5 space-y-0.5">
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </GuideSection>

      <p className="text-xs text-stone-400 text-center">
        टीप: हा सर्वसामान्य नियोजन आहे. तुमच्या परिस्थितीनुसार (गुंतवणूक,
        पाण्याची सोय, जागा) तपशील बदलू शकतात - स्थानिक पशुवैद्य व अनुभवी
        शेतकऱ्यांचा सल्ला नक्की घ्या.
      </p>

      <GuideHelpBanner />
    </div>
  );
}
