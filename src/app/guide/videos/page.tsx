import Breadcrumb from "@/components/Breadcrumb";
import GuideHelpBanner from "@/components/GuideHelpBanner";

const VIDEOS = [
  {
    title: "शेळी पालन व्यवसाय - संपूर्ण माहिती (मराठी)",
    desc: "शेळीपालन व्यवसाय कसा सुरू करावा याची सुरुवातीपासूनची माहिती.",
    url: "https://www.youtube.com/watch?v=8VS9fjafWKc",
  },
  {
    title: "बीटल शेळी पालन - खुराक फॉर्म्युला",
    desc: "बीटल जातीच्या शेळीपालनातून जास्त उत्पन्न आणि खुराकाचं प्रमाण.",
    url: "https://www.youtube.com/watch?v=ES4VWCBN-X4",
  },
  {
    title: "शेळीपालनासाठी सर्वोत्तम शेड",
    desc: "गोठा बांधताना कुठल्या गोष्टी लक्षात ठेवाव्यात.",
    url: "https://www.youtube.com/watch?v=IozLycO8hN4",
  },
  {
    title: "कमी खर्चात परफेक्ट शेड कसा बांधावा",
    desc: "Ravi Rajput यांच्याकडून कमी खर्चातल्या शेड बांधकामाचं मार्गदर्शन.",
    url: "https://www.youtube.com/watch?v=fKQqcMQM1Vk",
  },
  {
    title: "शेळी पालन शेड - व्हिडिओ मालिका (Playlist)",
    desc: "शेड बांधणीवरचे अनेक व्हिडिओ एकत्र.",
    url: "https://www.youtube.com/playlist?list=PL8pX9IOn5TS8J5ESbLDCgosXc3qI5A1T7",
  },
];

export default function GuideVideosPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Breadcrumb
        items={[
          { label: "मार्गदर्शन", href: "/guide" },
          { label: "व्हिडिओ मार्गदर्शन" },
        ]}
      />
      <h1 className="text-2xl font-bold text-stone-800">
        🎥 व्हिडिओ मार्गदर्शन (संदर्भासाठी)
      </h1>
      <p className="text-sm text-stone-500">
        मराठीतले काही उपयुक्त युट्युब व्हिडिओ खाली दिले आहेत. हे व्हिडिओ
        इतर शेतकरी/यूट्यूबर्सनी बनवलेले आहेत - अधिक सविस्तर आणि प्रात्यक्षिक
        माहितीसाठी ते नक्की बघा.
      </p>

      <div className="space-y-3">
        {VIDEOS.map((v) => (
          <a
            key={v.url}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 bg-white border border-stone-200 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <span className="text-3xl flex-shrink-0">▶️</span>
            <div>
              <p className="font-semibold text-stone-800">{v.title}</p>
              <p className="text-sm text-stone-500">{v.desc}</p>
            </div>
          </a>
        ))}
      </div>

      <GuideHelpBanner />
    </div>
  );
}
