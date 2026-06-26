import Breadcrumb from "@/components/Breadcrumb";
import GuideSection from "@/components/GuideSection";
import GuideHelpBanner from "@/components/GuideHelpBanner";

export default function GuideShedPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <Breadcrumb
        items={[
          { label: "मार्गदर्शन", href: "/guide" },
          { label: "गोठा/शेड" },
        ]}
      />
      <h1 className="text-2xl font-bold text-stone-800">
        🏠 शेळ्यांसाठी शेड (गोठा) कसा बांधावा
      </h1>
      <p className="text-sm text-stone-500">
        सुरुवातीपासून योग्य प्लॅन केल्यास खर्च कमी होतो आणि शेळ्यांचं आरोग्य
        चांगलं राहतं.
      </p>

      <GuideSection title="२०-२५ शेळ्यांसाठी शेडचा आकार">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>लांबी:</strong> ३० फूट
          </li>
          <li>
            <strong>रुंदी:</strong> १५ फूट
          </li>
          <li>
            <strong>एकूण क्षेत्र:</strong> सुमारे ४५० चौ. फूट
          </li>
        </ul>
        <p>जर पुढे ४०-५० शेळ्या ठेवायच्या असतील, तर शेड वाढवता येईल.</p>
      </GuideSection>

      <GuideSection title="१. जमिनीपासून उंच (Raised Platform)">
        <ul className="list-disc pl-5 space-y-1">
          <li>जमिनीपासून ३ ते ४ फूट उंच ठेवा.</li>
          <li>खाली शेण व लघवी पडतं, त्यामुळे स्वच्छता सोपी होते.</li>
          <li>ओलावा कमी राहतो आणि आजारांचं प्रमाण कमी होतं.</li>
        </ul>
      </GuideSection>

      <GuideSection title="२. फ्लोअर">
        <ul className="list-disc pl-5 space-y-1">
          <li>लाकडी किंवा RCC स्लॅट्स वापरा.</li>
          <li>
            स्लॅट्समध्ये १.५ ते २ सेमी अंतर ठेवा, जेणेकरून शेण खाली पडेल पण
            पाय अडकणार नाहीत.
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="३. छप्पर">
        <ul className="list-disc pl-5 space-y-1">
          <li>GI शीट किंवा PUF शीट वापरा.</li>
          <li>
            उंची - पुढील बाजू <strong>१०-१२ फूट</strong>, मागील बाजू{" "}
            <strong>८-९ फूट</strong> (पाणी वाहून जाण्यासाठी उतार).
          </li>
          <li>उन्हाळ्यात उष्णता कमी राहण्यासाठी इन्सुलेशन किंवा सावलीची व्यवस्था करा.</li>
        </ul>
      </GuideSection>

      <GuideSection title="४. हवा व प्रकाश">
        <ul className="list-disc pl-5 space-y-1">
          <li>चारही बाजूंनी भरपूर हवा खेळती राहील अशी रचना ठेवा.</li>
          <li>सकाळचा सूर्यप्रकाश मिळेल अशी दिशा निवडा.</li>
        </ul>
      </GuideSection>

      <GuideSection title="५. पाण्याचा निचरा">
        <ul className="list-disc pl-5 space-y-1">
          <li>पावसाचं पाणी शेडमध्ये साचू देऊ नका.</li>
          <li>शेडभोवती नाला किंवा उतार ठेवा.</li>
        </ul>
      </GuideSection>

      <GuideSection title="आतली विभागणी (वेगळे कक्ष ठेवा)">
        <ul className="list-disc pl-5 space-y-1">
          <li>प्रौढ माद्या</li>
          <li>बोकड</li>
          <li>गाभण शेळ्या</li>
          <li>करडे (पिल्ले)</li>
          <li>आजारी शेळ्यांसाठी वेगळा छोटा भाग</li>
        </ul>
      </GuideSection>

      <GuideSection title="खाद्य व पाणी व्यवस्था - कमी कामाची सोय">
        <ul className="list-disc pl-5 space-y-1">
          <li>बाहेरील बाजूला फीडर बसवा - आत न जाताही खुराक भरता येतो.</li>
          <li>
            प्रत्येक शेळीला सहज पाणी मिळेल अशी ऑटो किंवा मोठी पाण्याची
            व्यवस्था करा (गुरुत्वाकर्षणावर चालणारी टाकी + निप्पल ड्रिंकर
            वापरल्यास पाणी सांडतही नाही आणि रोज भरायची गरज कमी होते).
          </li>
        </ul>
      </GuideSection>

      <GuideSection title="अंदाजे खर्च (२०-२५ शेळ्या)">
        <ul className="list-disc pl-5 space-y-1">
          <li>साधे स्टील पाइप + GI शीट शेड: <strong>₹१.८ लाख ते ₹३ लाख</strong></li>
          <li>RCC व अधिक मजबूत बांधकाम: <strong>₹३ लाख ते ₹५ लाख</strong></li>
        </ul>
      </GuideSection>

      <p className="text-xs text-stone-400 text-center">
        टीप: ही सर्वसामान्य मार्गदर्शक माहिती आहे. नेमकं बांधकाम आणि बजेट
        तुमची जागा, शेळ्यांची संख्या आणि स्थानिक बांधकाम खर्चानुसार बदलेल -
        स्थानिक बांधकाम कारागीर व अनुभवी शेतकऱ्यांचा सल्ला घेऊनच अंतिम प्लॅन
        ठरवा.
      </p>

      <GuideHelpBanner />
    </div>
  );
}
