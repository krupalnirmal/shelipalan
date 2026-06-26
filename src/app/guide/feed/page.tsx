import Breadcrumb from "@/components/Breadcrumb";
import GuideSection from "@/components/GuideSection";
import GuideHelpBanner from "@/components/GuideHelpBanner";

const STAGES = [
  {
    stage: "नवजात पिल्लू (0-1 महिना)",
    feed: "आईचं दूध हेच मुख्य अन्न. जन्मानंतर लगेच (पहिल्या ३० मिनिटांत) चिकाचं दूध (कोलोस्ट्रम) पाजणं खूप महत्त्वाचं - यातून पिल्लाला रोगप्रतिकारशक्ती मिळते.",
  },
  {
    stage: "पिल्लू (१-३ महिने)",
    feed: "आईचं दूध सुरूच ठेवा. हळूहळू कोवळा हिरवा चारा आणि थोडं (५०-१०० ग्रॅम) खुराक सुरू करा.",
  },
  {
    stage: "पिल्लू (३-६ महिने)",
    feed: "दूध सोडवणी (weaning) या काळात होते. हिरवा चारा ३-४ किलो/दिवस + १००-१५० ग्रॅम खुराक द्या.",
  },
  {
    stage: "वाढणारी शेळी (६-१२ महिने)",
    feed: "हिरवा चारा वाढवा, १५०-२०० ग्रॅम खुराक + मिनरल मिक्सचर द्या. हाडं-स्नायू वाढीसाठी हा काळ महत्त्वाचा.",
  },
  {
    stage: "प्रौढ शेळी/बोकड (सामान्य देखभाल)",
    feed: "हिरवा चारा ३-४ किलो + वाळलेला चारा १ किलो + २०० ग्रॅम खुराक रोज द्या.",
  },
  {
    stage: "गाभण शेळी (शेवटचे २ महिने)",
    feed: "खुराक वाढवून २५०-३०० ग्रॅम करा. कॅल्शियम/मिनरल मिक्सचर आवश्यक - पिल्लाची वाढ याच काळात जास्त होते.",
  },
  {
    stage: "दूध देणारी शेळी",
    feed: "हिरवा चारा ३-४ किलो + वाळलेला चारा १ किलो + १५०-२५० ग्रॅम खुराक (दुधाच्या प्रमाणानुसार जास्त-कमी करा).",
  },
];

export default function GuideFeedPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Breadcrumb
        items={[
          { label: "मार्गदर्शन", href: "/guide" },
          { label: "खुराक" },
        ]}
      />
      <h1 className="text-2xl font-bold text-stone-800">
        🌾 वयानुसार खुराक - कोणत्या वयात काय द्यावं
      </h1>

      <div className="space-y-3">
        {STAGES.map((s) => (
          <div
            key={s.stage}
            className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm"
          >
            <p className="font-semibold text-green-700 mb-1">{s.stage}</p>
            <p className="text-sm text-stone-600 leading-relaxed">{s.feed}</p>
          </div>
        ))}
      </div>

      <GuideSection title="खुराकाचं चांगलं मिश्रण कसं बनवावं?">
        <p>
          साधारणपणे <strong>मक्याचा भुगा + शेंगदाणा पेंड + गव्हाचा कोंडा +
          मिनरल मिक्सचर</strong> हे मिश्रण चांगलं मानलं जातं. नेमकं प्रमाण
          शेळीचं वय, वजन आणि ती गाभण/दूध देणारी आहे की नाही यावर अवलंबून
          असतं - त्यासाठी स्थानिक पशुवैद्यांचा सल्ला नक्की घ्या.
        </p>
      </GuideSection>

      <GuideHelpBanner />
    </div>
  );
}
