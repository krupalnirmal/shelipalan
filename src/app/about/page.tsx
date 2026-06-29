import Breadcrumb from "@/components/Breadcrumb";
import GuideSection from "@/components/GuideSection";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Breadcrumb items={[{ label: "आमच्याबद्दल" }]} />
      <h1 className="text-2xl font-bold text-stone-800">
        🐐 मी आणि "शेळीपालन" का सुरू केलं?
      </h1>

      <GuideSection title="माझी ओळख">
        <p>
          मी <strong>निर्मल कृपाल पोपट</strong> — पोपट भिकाजी निर्मल आणि
          संगीता पोपट निर्मल यांचा मुलगा, <strong>महादेववाडी</strong> येथील.
          व्यवसायाने मी <strong>IT इंजिनिअर</strong> आहे.
        </p>
        <p>
          माझ्या आईने स्वतः <strong>३० वर्षं शेळीपालन</strong> केलं आहे, आणि
          लहानपणापासून मी हा व्यवसाय जवळून बघत आलो आहे. याच अनुभवातून मला
          खात्री आहे की हा व्यवसाय अजून पुढे जाऊ शकतो — आणि म्हणूनच मी हे
          "शेळीपालन" प्लॅटफॉर्म तयार केलं आहे.
        </p>
      </GuideSection>

      <GuideSection title="हे का सुरू केलं?">
        <p>
          माझा उद्देश साधा आहे — जास्तीत जास्त खातिक थेट शेतकऱ्यांच्या घरी
          पोहोचले पाहिजेत, जेणेकरून शेतकऱ्यांना त्यांच्या शेळ्या-बोकडांचा
          योग्य भाव मिळेल.
        </p>
        <p>
          आज आपण ऑनलाइन कपडे, वस्तू मागवतो, ऑर्डर करतो — मग शेळीपालनासारखा
          मोठा व्यवसायही याच पुढच्या टप्प्यावर का नेऊ नये?
        </p>
      </GuideSection>

      <GuideSection title="पुढचं स्वप्न">
        <p>
          जर आपण सगळे शेतकरी एकत्र आलो, एक चांगला गट बनवला, तर उद्या आपण थेट
          शहरांमध्ये सप्लाय करू शकतो — जिथे मागणी खूप आहे आणि भावही चांगला
          मिळतो.
        </p>
        <p>
          आधीसारखंच जगायचं, की काही नवीन करून पुढे जायचं? चला, एकत्र पुढे
          जाऊया.
        </p>
      </GuideSection>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center space-y-1">
        <p className="text-stone-700">
          ही वाटचाल एकट्याने होणार नाही — सगळ्यांनी साथ द्यावी, ही विनंती. 🙏
        </p>
        <p className="font-semibold text-green-800 pt-2">
          निर्मल कृपाल पोपट
        </p>
        <p className="text-sm text-stone-500">
          📞{" "}
          <a href="tel:9762415808" className="hover:underline">
            9762415808
          </a>{" "}
          · ✉️{" "}
          <a
            href="mailto:krupalnirmal0301@gmail.com"
            className="hover:underline"
          >
            krupalnirmal0301@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
