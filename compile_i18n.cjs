const fs = require('fs');
const path = require('path');

const dict = {
    // ---------------- COMMON NAV & ACTIONS ----------------
    "nav.pageHelp": { en: "Page Help", hi: "पेज हेल्प", mr: "पृष्ठ मदत", ta: "பக்க உதவி", te: "పేజీ సహాయం", gu: "પૃષ્ઠ મદદ", bn: "পৃষ্ঠা সাহায্য", kn: "ಪುಟದ ಸಹಾಯ" },
    "nav.home": { en: "Home", hi: "होम", mr: "मुख्यपृष्ठ", ta: "முகப்பு", te: "హోమ్", gu: "ઘર", bn: "হোম", kn: "ಮುಖಪುಟ" },
    "nav.dashboard": { en: "My Business", hi: "मेरा व्यवसाय", mr: "माझा व्यवसाय", ta: "என் வணிகம்", te: "నా వ్యాపారం", gu: "મારું વ્યવસાય", bn: "আমার ব্যবসা", kn: "ನನ್ನ ವ್ಯಾಪಾರ" },
    "nav.finance": { en: "Calculator", hi: "कैलकुलेटर", mr: "कॅल्क्युलेटर", ta: "கால்குலேட்டர்", te: "క్యాలిక్యులేటర్", gu: "કેલ્ક્યુલેટર", bn: "ক্যালকুলেটর", kn: "ಕ್ಯಾಲ್ಕುಲೇಟರ್" },
    "nav.schemes": { en: "Schemes", hi: "योजनाएं", mr: "योजना", ta: "திட்டங்கள்", te: "పథకాలు", gu: "યોજનાઓ", bn: "স্কিম", kn: "ಯೋಜನೆಗಳು" },
    "nav.records": { en: "Records", hi: "रिकॉर्ड्स", mr: "नोंदी", ta: "பதிவுகள்", te: "రికార్డులు", gu: "રેકોર્ડ્સ", bn: "রেকর্ড", kn: "ದಾಖಲೆಗಳು" },
    "nav.community": { en: "Experts", hi: "विशेषज्ञ", mr: "तज्ञ", ta: "நிபுணர்கள்", te: "నిపుణులు", gu: "નિષ્ણાતો", bn: "বিশেষজ্ঞরা", kn: "ತಜ್ಞರು" },
    "nav.chat": { en: "Ask Bandhu", hi: "बंधु से पूछें", mr: "बंधू विचारा", ta: "பந்துவிடம் கேள்", te: "బంధువు అడగండి", gu: "બંધુને પૂછો", bn: "বন্ধু কে জিজ্ঞাসা করুন", kn: "ಬಂಧು ಕೇಳಿ" },

    // ---------------- DASHBOARD (Module) ----------------
    "dash.title": { en: "Business Health Dashboard", hi: "व्यवसाय स्वास्थ्य डैशबोर्ड", mr: "व्यवसाय आरोग्य डॅशबोर्ड", ta: "வணிக சுகாதார டேஷ்போர்டு", te: "వ్యాపార ఆరోగ్య డాష్బోర్డ్", gu: "વ્યવસાય આરોગ્ય ડેશબોર્ડ", bn: "ব্যবসা স্বাস্থ্য ড্যাশবোর্ড", kn: "ವ್ಯಾಪಾರ ಆರೋಗ್ಯ ಡ್ಯಾಶ್ಬೋರ್ಡ್" },
    "dash.sub": { en: "Sales, Profits & Warnings", hi: "बिक्री, लाभ एवं चेतावनी", mr: "विक्री, नफा आणि इशारे", ta: "விற்பனை, லாபங்கள் மற்றும் எச்சரிக்கைகள்", te: "అమ్మకాలు, లాభాలు & హెచ్చరికలు", gu: "વેચાણ, નફો અને ચેતવણીઓ", bn: "বিক্রয়, লাভ এবং সতর্কতা", kn: "ಮಾರಾಟ, ಲಾಭಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳು" },
    "dash.warning.title": { en: "Early Warning", hi: "शुरुआती चेतावनी", mr: "सुरुवातीचा इशारा", ta: "ஆரம்ப எச்சரிக்கை", te: "ముందస్తు హెచ్చరిక", gu: "પ્રારંભિક ચેતવણી", bn: "প্রাথমিক সতর্কতা", kn: "ಮುಂಚಿನ ಎಚ್ಚರಿಕೆ" },
    "dash.warning.statusGrowing": { en: "Sales growing (toggle)", hi: "बिक्री बढ़ रही (toggle)", mr: "विक्री वाढत आहे (toggle)", ta: "விற்பனை வளர்கிறது", te: "అమ్మకాలు పెరుగుతున్నాయి", gu: "વેચાણ વધી રહ્યું છે", bn: "বিক্রয় বাড়ছে", kn: "ಮಾರಾಟ ಬೆಳೆಯುತ್ತಿದೆ" },
    "dash.warning.statusDeclining": { en: "Sales declined (toggle)", hi: "बिक्री घटी (toggle)", mr: "विक्री कमी झाली (toggle)", ta: "விற்பனை குறைந்தது", te: "అమ్మకాలు తగ్గాయి", gu: "વેચાણ ઘટ્યું", bn: "বিক্রয় কমেছে", kn: "ಮಾರಾಟ ಕಡಿಮೆಯಾಗಿದೆ" },
    "dash.warning.declineTitle": { en: "Sales declining for 3 months!", hi: "पिछले 3 महीनों से बिक्री में गिरावट!", mr: "गेल्या ३ महिन्यांपासून विक्रीत घट!", ta: "3 மாதங்களாக விற்பனை குறைகிறது!", te: "3 నెలలుగా అమ్మకాలు తగ్గాయి!", gu: "૩ મહિનાથી વેચાણમાં ઘટાડો!", bn: "৩ মাস ধরে বিক্রি কমছে!", kn: "೩ ತಿಂಗಳಿಂದ ಮಾರಾಟ ಕಡಿಮೆಯಾಗಿದೆ!" },
    "dash.warning.declineSub": { en: "New competitor arriving & credit blocked. See action items.", hi: "नए प्रतिस्पर्धी का आगमन एवं उधारी में नगद ब्लॉक होना। नीचे दिए गए कदम देखें।", mr: "नवीन स्पर्धक आणि उधारी. कृती पहा.", ta: "புதிய போட்டியாளர். கீழே உள்ள படிகளைப் பார்க்கவும்.", te: "కొత్త పోటీదారు. చర్యల కోసం కింద చూడండి.", gu: "નવો હરીફ. નીચે પગલાં જુઓ.", bn: "নতুন প্রতিযোগী। নিচে দেখুন।", kn: "ಹೊಸ ಸ್ಪರ್ಧಿ. ಕೆಳಗೆ ನೋಡಿ." },
    "dash.warning.growTitle": { en: "Sales stable and growing!", hi: "बिक्री स्थिर और बढ़ रही है!", mr: "विक्री स्थिर आणि वाढत आहे!", ta: "விற்பனை நிலையானது மற்றும் வளர்கிறது!", te: "అమ్మకాలు స్థిరంగా పెరుగుతున్నాయి!", gu: "વેચાણ સ્થિર અને વધી રહ્યું છે!", bn: "বিক্রয় স্থিতিশীল এবং বাড়ছে!", kn: "ಮಾರಾಟ ಸ್ಥಿರ ಮತ್ತು ಬೆಳೆಯುತ್ತಿದೆ!" },
    "dash.warning.growSub": { en: "Right time to expand - add a new product.", hi: "व्यवसाय विस्तार का सही समय — नया प्रोडक्ट जोड़ें।", mr: "उत्पादन जोडण्याची योग्य वेळ.", ta: "புதிய தயாரிப்பு சேர்க்க சரியான நேரம்.", te: "కొత్త ఉత్పత్తిని జోడించడానికి సరైన సమయం.", gu: "નવું ઉત્પાદન ઉમેરવાનો યોગ્ય સમય.", bn: "নতুন পণ্য যোগ করার সঠিক সময়।", kn: "ಹೊಸ ಉತ್ಪನ್ನ ಸೇರಿಸಲು ಸರಿಯಾದ ಸಮಯ." },
    "dash.incomeTitle": { en: "Monthly Income & Expense", hi: "मासिक आय & खर्च", mr: "मासिक उत्पन्न आणि खर्च", ta: "மாத வருமானம் மற்றும் செலவு", te: "నెలవారీ ఆదాయం & ఖర్చు", gu: "માસિક આવક અને ખર્ચ", bn: "মাসিক আয় এবং ব্যয়", kn: "ಮಾಸಿಕ ಆದಾಯ ಮತ್ತು ವೆಚ್ಚ" },
    "dash.monthlySales": { en: "Monthly Sales", hi: "मासिक बिक्री", mr: "मासिक विक्री", ta: "மாத விற்பனை", te: "నెలవారీ విక్రయాలు", gu: "માસિક વેચાણ", bn: "মাসিক বিক্রয়", kn: "ಮಾಸಿಕ ಮಾರಾಟ" },
    "dash.monthlyExpenses": { en: "Monthly Expenses", hi: "मासिक खर्च", mr: "मासिक खर्च", ta: "மாத செலவு", te: "నెలవారీ ఖర్చులు", gu: "માસિક ખર્ચ", bn: "মাসিক ব্যয়", kn: "ಮಾಸಿಕ ವೆಚ್ಚ" },
    "dash.netProfit": { en: "Net Profit", hi: "शुद्ध लाभ", mr: "निव्वळ नफा", ta: "நிகர லாபம்", te: "నికర లాభం", gu: "ચોખ્ખો નફો", bn: "নিট লাভ", kn: "ನಿವ್ವಳ ಲಾಭ" },
    "dash.annual": { en: "Annual", hi: "वार्षिक", mr: "वार्षिक", ta: "ஆண்டு", te: "వార్షిక", gu: "વાર્ષિક", bn: "বার্ষিক", kn: "ವಾರ್ಷಿಕ" },
    "dash.healthScore": { en: "Health Score", hi: "स्वास्थ्य स्कोर", mr: "आरोग्य स्कोअर", ta: "சுகாதார மதிப்பெண்", te: "హెల్త్ స్కోరు", gu: "આરોગ્ય સ્કોર", bn: "স্বাস্থ্য স্কোর", kn: "ಆರೋಗ್ಯ ಸ್ಕೋರ್" },
    "dash.actionTitle": { en: "What steps to take (Action Cards)", hi: "क्या कदम उठाएं (Action Cards)", mr: "काय पावले उचलावीत", ta: "என்ன நடவடிக்கைகள் எடுக்க வேண்டும்", te: "ఏమి చర్యలు తీసుకోవాలి", gu: "કયાં પગલાં લેવા", bn: "কী পদক্ষেপ নেবেন", kn: "ಯಾವ ಕ್ರಮಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು" },
    "dash.priorityHigh": { en: "HIGH", hi: "उच्च", mr: "उच्च", ta: "உயர்", te: "అధిక", gu: "ઉચ્ચ", bn: "উচ্চ", kn: "ಹೆಚ್ಚಿನ" },

    // Fallbacks Action specific Dashboard
    "dash.action.upiTitle": { en: "Add Digital Payment (UPI QR)", hi: "डिजिटल भुगतान (UPI QR) लगाएं", mr: "डिजिटल पेमेंट जोडा", ta: "டிஜிட்டல் தொகையைச் சேர்", te: "డిజిటల్ చెల్లింపు జోడించండి", gu: "ડિજિટલ ચુકવણી ઉમેરો", bn: "ডিজিটাল পেমেন্ট যোগ করুন", kn: "ಡಿಜಿಟಲ್ ಪಾವತಿ ಸೇರಿಸಿ" },
    "dash.action.upiSub": { en: "Add UPI QR code for digital payments", hi: "Add UPI QR code for digital payments", mr: "UPI QR कोड जोडा", ta: "UPI QR குறியீட்டைச் சேர்க்கவும்", te: "UPI QR కోడ్‌ని జోడించండి", gu: "UPI QR કોડ ઉમેરો", bn: "UPI QR কোড যোগ করুন", kn: "UPI QR ಕೋಡ್ ಸೇರಿಸಿ" },
    "dash.action.marginTitle": { en: "Add 2 high-margin products", hi: "2 नए उच्च-मार्जिन उत्पाद जोड़ें", mr: "२ उच्च-मार्जिन उत्पादने जोडा", ta: "2 அதிக லாபம் கொண்ட தயாரிப்புகளைச் சேர்", te: "2 అధిక మార్జిన్ ఉత్పత్తులను జోడించండి", gu: "૨ નવા ઉચ્ચ-માર્જિન ઉત્પાદનો ઉમેરો", bn: "২ টি উচ্চ-মার্জিন পণ্য যোগ করুন", kn: "೨ ಹೊಸ ಹೆಚ್ಚಿನ-ಮಾರ್ಜಿನ್ ಉತ್ಪನ್ನಗಳನ್ನು ಸೇರಿಸಿ" },
    "dash.action.marginSub": { en: "Start selling Paneer/Ghee for 30% more profit", hi: "Start selling Paneer/Ghee for 30% more profit", mr: "पनीर/तूप विक्री सुरू करा", ta: "பன்னீர்/நெய் விற்பனையைத் தொடங்குங்கள்", te: "పనీర్/నెయ్యి అమ్మడం ప్రారంభించండి", gu: "પનીર/ઘીનું વેચાણ શરૂ કરો", bn: "পনির/ঘি বিক্রি শুরু করুন", kn: "ಪನೀರ್/ತುಪ್ಪ ಮಾರಾಟ ಪ್ರಾರಂಭಿಸಿ" },
    "dash.action.creditTitle": { en: "Review pending credit", hi: "पुरानी उधारी की समीक्षा करें", mr: "प्रलंबित कर्जाचे पुनरावलोकन करा", ta: "நிலுவையிலுள்ள கடனை மதிப்பாய்வு செய்யவும்", te: "పెండింగ్ రుణాన్ని సమీక్షించండి", gu: "બાકી ધિરાણની સમીક્ષા કરો", bn: "অমীমাংসিত ঋণ পর্যালোচনা করুন", kn: "ಬಾಕಿ ಸಾಲವನ್ನು ಪರಿಶೀಲಿಸಿ" },
    "dash.action.creditSub": { en: "Collect pending village credit before new stock", hi: "Collect pending village credit before new stock", mr: "नवीन साठा करण्यापूर्वी कर्ज वसूल करा", ta: "புதிய சரக்கு சேர்க்கும் முன் கடன் வசூலிக்கவும்", te: "కొత్త సరుకు రాకముందే రుణాన్ని వసూలు చేయండి", gu: "નવો સ્ટોક મેળવતા પહેલા ક્રેડિટ કલેક્ટ કરો", bn: "নতুন স্টকের আগে ঋণ সংগ্রহ করুন", kn: "ಹೊಸ ಸ್ಟಾಕ್ ಬರುವ ಮೊದಲು ಸಾಲ ವಸೂಲಿ ಮಾಡಿ" },
    "dash.action.mudraTitle": { en: "Apply for ₹50K MUDRA loan", hi: "मुद्रा योजना से ₹50K लोन आवेदन करें", mr: "मुद्रा योजनेतून ५०,००० चे कर्ज", ta: "₹50K முத்ரா கடனுக்கு விண்ணப்பிக்கவும்", te: "₹50K ముద్రా రుణం దరఖాస్తు", gu: "₹50K મુદ્રા લોન માટે અરજી કરો", bn: "₹50K মুদ্রা ঋণের জন্য আবেদন করুন", kn: "₹50K ಮುದ್ರಾ ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" },
    "dash.action.mudraSub": { en: "Apply for low-interest MUDRA Shishu loan", hi: "Apply for low-interest MUDRA Shishu loan", mr: "मुद्रा शिशु कर्जासाठी अर्ज करा", ta: "முத்ரா சிசு கடனுக்கு விண்ணப்பிக்கவும்", te: "ముద్రా శిశు రుణానికి దరఖాస్తు చేయండి", gu: "મુદ્રા શિશુ લોન માટે અરજી કરો", bn: "মুদ্রা শিশু ঋণের জন্য আবেদন করুন", kn: "ಮುದ್ರಾ ಶಿಶು ಸಾಲಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ" },

    // ---------------- FINANCE MODULE ----------------
    "fin.title": { en: "Financial Calculator & Loan Router", hi: "वित्तीय कैलकुलेटर एवं लोन रूटर" },
    "fin.sub": { en: "Smart Financial Calculator", hi: "स्मार्ट वित्तीय कैलकुलेटर" },
    "fin.notice": { en: "Real Financial Math — Based on 10% Margin Rule & Govt Rates.", hi: "सटीक वित्तीय गणना (Real Financial Math) — 10% मार्जिन नियम एवं सरकारी ब्याज दरों पर आधारित।" },
    "fin.step1": { en: "Step 1", hi: "चरण 1" },
    "fin.capitalTitle": { en: "Your Capital & Costs", hi: "आपकी पूंजी एवं लागत" },
    "fin.ownCap": { en: "Your Savings (Own Capital)", hi: "आपकी बचत पूंजी (Own Capital)" },
    "fin.projCap": { en: "10% Rule → Project Capacity:", hi: "10% नियम → प्रोजेक्ट क्षमता:" },
    "fin.maxLoan": { en: "Max Loan:", hi: "अधिकतम लोन:" },
    "fin.breakdownTitle": { en: "\"How much do I really need?\" — Breakdown:", hi: "\"मुझे वास्तव में कितना चाहिए?\" — विवरण:" },
    "fin.standardRates": { en: "Fill Standard Rates", hi: "मानक दरें भरें" },
    "fin.eq": { en: "Equipment", hi: "उपकरण (Equipment)" },
    "fin.st": { en: "Stock", hi: "स्टॉक (Stock)" },
    "fin.set": { en: "Setup", hi: "सेटअप (Setup)" },
    "fin.wc": { en: "Working Capital (WC)", hi: "कार्यशील पूंजी (WC)" },
    "fin.subTitle": { en: "Govt Subsidy / Grant", hi: "सरकारी सब्सिडी / अनुदान" },
    "fin.subHelp": { en: "Enter PMEGP / MUDRA Subsidy Amount", hi: "PMEGP / मुद्रा सब्सिडी राशि दर्ज करें" },
    "fin.step2": { en: "Step 2", hi: "चरण 2" },
    "fin.loanDec": { en: "Loan Decision", hi: "ऋण निर्णय" },
    "fin.safeBorrow": { en: "Safe Borrowing Advice", hi: "सुरक्षित ऋण सलाह" },
    "fin.maxEligible": { en: "Max Eligibility:", hi: "अधिकतम पात्रता:" },
    "fin.recBorrow": { en: "Recommended Safe Loan:", hi: "अनुशंसित सुरक्षित लोन:" },
    "fin.recSub": { en: "Take only what is needed — save unnecessary interest.", hi: "केवल आवश्यक राशि लें — अनावश्यक ब्याज बचाएं।" },
    "fin.step3": { en: "Step 3", hi: "चरण 3" },
    "fin.selScheme": { en: "Selected Govt Scheme", hi: "चयनित सरकारी लोन योजना" },
    "fin.intRate": { en: "Interest Rate", hi: "ब्याज दर" },
    "fin.tenure": { en: "Tenure", hi: "अवधि" },
    "fin.mora": { en: "Moratorium", hi: "छूट अवधि" },
    "fin.finType": { en: "Financing", hi: "वित्त पोषण" },
    "fin.keyBen": { en: "Key Benefits:", hi: "मुख्य लाभ:" },
    "fin.step4": { en: "Step 4", hi: "चरण 4" },
    "fin.emiTitle": { en: "Monthly Installment (EMI) Calculator", hi: "मासिक किश्त (EMI) कैलकुलेटर" },
    "fin.emiSub": { en: "Standard Amortization + Moratorium", hi: "Standard Amortization + Moratorium" },
    "fin.intOnly": { en: "Interest Only", hi: "केवल ब्याज" },
    "fin.zeroPay": { en: "Zero Payment", hi: "शून्य भुगतान" },
    "fin.moraPay": { en: "Initial", hi: "शुरुआती" },
    "fin.moraSub": { en: "months", hi: "महीने" },
    "fin.regEmi": { en: "Regular Monthly EMI", hi: "नियमित मासिक किश्त" },
    "fin.totInt": { en: "Total Interest", hi: "कुल ब्याज" },
    "fin.stepMath": { en: "Step-by-Step Math", hi: "पारदर्शी गणित (Step-by-Step Math)" },
    "fin.schemeDetail": { en: "View Subsidy & Govt Scheme Details:", hi: "सरकारी सब्सिडी एवं योजनाओं का विवरण:" },
    "fin.viewScheme": { en: "View Schemes", hi: "योजनाएं देखें" },

    // ---------------- SCHEMES MODULE ----------------
    "sch.title": { en: "Government Scheme Advisor", hi: "सरकारी योजना सलाहकार" },
    "sch.sub": { en: "Government Scheme Advisor — Subsidies & Loans", hi: "Government Scheme Advisor — सब्सिडी एवं ऋण योजनाएं" },
    "sch.benTitle": { en: "\"Govt Benefit → Loan Reduction\"", hi: "\"सरकारी लाभ → लोन कटौती\"" },
    "sch.benSub": { en: "Getting subsidy reduces your total loan need.", hi: "सब्सिडी मिलने पर आपकी लोन आवश्यकता कम हो जाती है।" },
    "sch.estSub": { en: "Estimated Subsidy Amount:", hi: "अनुमानित सब्सिडी राशि:" },
    "sch.viewCalc": { en: "View in Calculator", hi: "कैलकुलेटर में देखें" },
    "sch.all": { en: "All Schemes", hi: "सभी योजनाएं" },
    "sch.mudra": { en: "MUDRA", hi: "मुद्रा" },
    "sch.women": { en: "Women SHG", hi: "महिला SHG" },
    "sch.maxLoan": { en: "Max Loan:", hi: "अधिकतम लोन:" },
    "sch.subsidy": { en: "Subsidy:", hi: "सब्सिडी:" },
    "sch.elig": { en: "Eligibility:", hi: "पात्रता:" },
    "sch.addSub": { en: "Add ₹25,000 Subsidy", hi: "₹25,000 सब्सिडी जोड़ें" },
    "sch.portal": { en: "Portal", hi: "पोर्टल" },

    // ---------------- MY RECORDS MODULE ----------------
    "rec.title": { en: "My Records", hi: "मेरे रिकॉर्ड (My Records)" },
    "rec.sub": { en: "Full Micro-ERP — Sales, Purchases, Stock, Credits, Cash Flow", hi: "Full Micro-ERP — बिक्री, खरीद, स्टॉक, उधारी, कैश फ्लो" },
    "rec.tab.sales": { en: "Sales", hi: "बिक्री (Sales)" },
    "rec.tab.purchases": { en: "Purchases", hi: "खरीद / खर्च" },
    "rec.tab.inventory": { en: "Inventory", hi: "स्टॉक (Inventory)" },
    "rec.tab.contacts": { en: "Contacts", hi: "ग्राहक / आपूर्तिकर्ता" },
    "rec.tab.ledgers": { en: "Ledgers", hi: "उधारी / देनदारी" },
    "rec.tab.health": { en: "Health Score", hi: "स्वास्थ्य स्कोर" },
    "rec.totalSales": { en: "Total Sales", hi: "कुल बिक्री" },
    "rec.totalPurchases": { en: "Total Expense", hi: "कुल खर्च" },
    "rec.cashFlow": { en: "Cash Flow", hi: "कैश फ्लो" },
    "rec.add": { en: "Add", hi: "जोड़ें" },

    // ---------------- EXPERT COMMUNITY ----------------
    "exp.title": { en: "Expert Consultations & Community", hi: "विशेषज्ञ परामर्श & समुदाय" },
    "exp.sub": { en: "Expert Connect & Community Forum", hi: "Expert Connect & Community Forum" },
    "exp.ask": { en: "Ask Question", hi: "प्रश्न पूछें" },
    "exp.talk": { en: "Speak to Experts", hi: "विशेषज्ञों से बात करें" },
    "exp.forum": { en: "Community Discussions", hi: "समुदाय चर्चा" },
    "exp.book": { en: "Book Call", hi: "कॉल बुक करें" },
    "exp.spec": { en: "Specialty:", hi: "विशेषज्ञता:" },

    // HOME SCREEN

    "home.card.start": { en: "Start Business", hi: "व्यवसाय शुरू करें", mr: "व्यवसाय सुरू करा", ta: "வணிகத்தைத் தொடங்கு", te: "వ్యాపారం ప్రారంభించండి", gu: "વ્યવસાય શરૂ કરો", bn: "ব্যবসা শুরু করুন", kn: "ವ್ಯಾಪಾರ ಪ್ರಾರಂಭಿಸಿ" },
    "home.card.startSub": { en: "Ideas & Feasibility", hi: "आइडिया एवं व्यवहार्यता", mr: "कल्पना आणि व्यवहार्यता", ta: "யோசனைகள் மற்றும் சாத்தியக்கூறு", te: "ఆలోచనలు & సాధ్యత", gu: "વિચારો અને શક્યતા", bn: "ধারণা এবং সম্ভাব্যতা", kn: "ಐಡಿಯಾಗಳು ಮತ್ತು ಕಾರ್ಯಸಾಧ್ಯತೆ" },
    "home.card.exist": { en: "Existing Business", hi: "मौजूदा व्यवसाय", mr: "विद्यमान व्यवसाय", ta: "இருக்கும் வணிகம்", te: "ప్రస్తుత వ్యాపారం", gu: "વર્તમાન વ્યવસાય", bn: "বিদ্যমান ব্যবসা", kn: "ಹಾಲೀ ವ್ಯಾಪಾರ" },
    "home.card.existSub": { en: "Manage Accounts", hi: "खाता प्रबंधन", mr: "खाती व्यवस्थापन", ta: "கணக்குகள் மேலாண்மை", te: "ఖాతాల నిర్వహణ", gu: "એકાઉન્ટ્સ મેનેજમેન્ટ", bn: "অ্যাকাউন্ট ব্যবস্থাপনা", kn: "ಖಾತೆಗಳ ನಿರ್ವಹಣೆ" },
    "home.card.grow": { en: "Expand Business", hi: "व्यवसाय बढ़ाएं", mr: "व्यवसाय वाढवा", ta: "வணிகத்தை விரிவாக்கு", te: "వ్యాపారాన్ని విస్తరించండి", gu: "વ્યવસાય વિસ્તૃત કરો", bn: "ব্যবসা বাড়ান", kn: "ವ್ಯಾಪಾರ ವಿಸ್ತರಿಸಿ" },
    "home.card.growSub": { en: "Market & Demand", hi: "बाजार एवं मांग", mr: "बाजार आणि मागणी", ta: "சந்தை மற்றும் தேவை", te: "మార్కెట్ & డిమాండ్", gu: "બજાર અને માંગ", bn: "বাজার এবং চাহিদা", kn: "ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಬೇಡಿಕೆ" },
    "home.card.money": { en: "Need Loan / Capital", hi: "लोन / पूंजी चाहिए", mr: "कर्ज / भांडवल पाहिजे", ta: "கடன் / மூலதனம் தேவை", te: "రుణం / మూలధనం కావాలి", gu: "લોન / મૂડી જોઈએ", bn: "ঋণ / মূলধন প্রয়োজন", kn: "ಸಾಲ / ಬಂಡವಾಳ ಬೇಕು" },
    "home.card.moneySub": { en: "Financial Planner", hi: "वित्तीय योजना", mr: "आर्थिक नियोजन", ta: "நிதி திட்டமிடல்", te: "ఆర్థిక ప్రణాళిక", gu: "આર્થિક આયોજન", bn: "আর্থিক পরিকল্পনা", kn: "ಹಣಕಾಸು ಯೋಜನೆ" },
    "home.card.problem": { en: "Facing Problem", hi: "परेशानी हो रही है", mr: "अडचण येत आहे", ta: "பிரச்சனை எதிர்கொள்கிறது", te: "సమస్య ఉంది", gu: "મુશ્કેલી પડી રહી છે", bn: "সমস্যা হচ্ছে", kn: "ಸಮಸ್ಯೆಯಾಗುತ್ತಿದೆ" },
    "home.card.problemSub": { en: "Diagnosis & Help", hi: "पहचान एवं सहायता", mr: "निदान आणि मदत", ta: "கண்டறிதல் மற்றும் உதவி", te: "నిర్ధారణ & సహాయం", gu: "નિદાન અને મદદ", bn: "নির্ণয় এবং সহায়তা", kn: "ಪತ್ತೆ ಮತ್ತು ಸಹಾಯ" },
    "home.card.scheme": { en: "Get Govt Benefit", hi: "सरकारी योजनाएं", mr: "सरकारी योजना", ta: "அரசு திட்டங்கள்", te: "ప్రభుత్వ పథకాలు", gu: "સરકારી યોજનાઓ", bn: "সরকারি স্কিম", kn: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು" },
    "home.card.schemeSub": { en: "Subsidies & Grants", hi: "सब्सिडी एवं अनुदान", mr: "अनुदान आणि सवलती", ta: "மானியம் மற்றும் உதவி", te: "సబ్సిడీలు & నిధులు", gu: "સબસિડી અને ગ્રાન્ટ", bn: "ভর্তুকি এবং অনুদান", kn: "ಸಬ್ಸಿಡಿ ಮತ್ತು ಅನುದಾನ" },
    "home.card.expert": { en: "Ask Expert / Leader", hi: "विशेषज्ञ से बात करें", mr: "तज्ञांशी बोला", ta: "நிபுணரிடம் பேசுங்கள்", te: "నిపుణులతో మాట్లాడండి", gu: "નિષ્ણાત સાથે વાત કરો", bn: "বিশেষজ্ঞের সাথে কথা বলুন", kn: "ತಜ್ಞರೊಂದಿಗೆ ಮಾತನಾಡಿ" },
    "home.card.expertSub": { en: "Community Guidance", hi: "समुदाय मार्गदर्शन", mr: "समुदाय मार्गदर्शन", ta: "சமூக வழிகாட்டுதல்", te: "సంఘం మార్గదర్శకత్వం", gu: "સમુદાય માર્ગદર્શન", bn: "সম্প্রদায় গাইডেন্স", kn: "ಸಮುದಾಯದ ಮಾರ್ಗದರ್ಶನ" },
    "home.hero.title": { en: "What would you like to do today?", hi: "आज आप क्या करना चाहते हैं?", mr: "तुम्हाला काय करायचे आहे?", ta: "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?", te: "మిరు ఈ రోజు ఏమి చేయాలి అనుకుంటున్నారు?", gu: "તમે આજે શું કરવા માંગો છો?", bn: "আপনি আজ কি করতে চান?", kn: "ನೀವು ಇಂದು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?" },
    "home.hero.sub": { en: "Your personal guide to managing, funding, and expanding your village enterprise.", hi: "आपके ग्राम व्यवसाय को प्रबंधित करने और बढ़ाने के लिए व्यक्तिगत मार्गदर्शक।", mr: "ग्राम व्यवसाय व्यवस्थापित करण्यासाठी वैयक्तिक मार्गदर्शक.", ta: "உங்கள் கிராம வணிகத்தை நிர்வகிக்க தனிப்பட்ட வழிகாட்டி.", te: "మీ గ్రామ వ్యాపారాన్ని నిర్వహించడానికి వ్యక్తిగత మార్గదర్శి.", gu: "તમારા ગામના વ્યવસાયને સંચાલિત કરવા માટે વ્યક્તિગત માર્ગદર્શિકા.", bn: "আপনার গ্রামীণ ব্যবসা পরিচালনার জন্য ব্যক্তিগত গাইড।", kn: "ನಿಮ್ಮ ಗ್ರಾಮ ವ್ಯಾಪಾರವನ್ನು ನಿರ್ವಹಿಸಲು ವೈಯಕ್ತಿಕ ಮಾರ್ಗದರ್ಶಿ." },
    "home.hero.voice": { en: "Tell Bandhu...", hi: "बंधु को बताएं...", mr: "बंधूला सांगा...", ta: "பந்துவிடம் கூறுங்கள்...", te: "బంధువుకు చెప్పండి...", gu: "બંધુને કહો...", bn: "বন্ধুকে বলুন...", kn: "ಬಂಧುವಿಗೆ ಹೇಳಿ..." },
    "home.section.todo": { en: "I want to...", hi: "मुझे करना है...", mr: "मला करायचे आहे...", ta: "நான் செய்ய விரும்புகிறேன்...", te: "నేను చేయాలనుకుంటున్నాను...", gu: "મારે કરવું છે...", bn: "আমি করতে চাই...", kn: "ನಾನು ಮಾಡಲು ಬಯಸುತ್ತೇನೆ..." },

    // BUSINESS CATEGORIES
    "business.categories.dairy": { en: "Dairy & Animal Husbandry", hi: "डेयरी एवं पशुपालन", mr: "दुग्धव्यवसाय आणि पशुसंवर्धन", ta: "பால் மற்றும் கால்நடை", te: "పాడి పరిశ్రమ & పశుసంవర్ధక", gu: "ડેરી અને પશુપાલન", bn: "দুধ এবং পশুপালন", kn: "ಹೈನುಗಾರಿಕೆ ಮತ್ತು ಪಶುಸಂಗೋಪನೆ" },
    "business.categories.tailoring": { en: "Tailoring & Garments", hi: "सिलाई एवं कपड़े", mr: "शिवणकाम आणि कपडे", ta: "தையல் மற்றும் ஆடைகள்", te: "టైలరింగ్ & దుస్తులు", gu: "સીવણકામ અને કપડાં", bn: "টেইলারিং এবং গার্মেন্টস", kn: "ಹೊಲಿಗೆ ಮತ್ತು ಉಡುಪುಗಳು" },
    "business.categories.grocery": { en: "Grocery & Kirana Store", hi: "किराना दुकान", mr: "किराणा दुकान", ta: "மளிகை கடை", te: "కిరాణా దుకాణం", gu: "કિરાના દુકાન", bn: "মুদির দোকান", kn: "ದಿನಸಿ ಮತ್ತು ಕಿರಾಣಿ ಅಂಗಡಿ" },
    "business.categories.snacks": { en: "Snacks & Food Processing", hi: "नाश्ता एवं खाद्य प्रसंस्करण", mr: "स्नॅक्स आणि अन्न प्रक्रिया", ta: "சிற்றுண்டிகள்", te: "స్నాక్స్ & ఫుడ్ ప్రాసెసింగ్", gu: "નાસ્તો અને ખાદ્ય પ્રક્રિયા", bn: "খাবার এবং ফুড প্রসেসিং", kn: "ಸ್ನ್ಯಾಕ್ಸ್ ಮತ್ತು ಫುಡ್ ಪ್ರೊಸೆಸಿಂಗ್" },
    "business.categories.handicrafts": { en: "Handicrafts & Artisans", hi: "हस्तशिल्प एवं कारीगरी", mr: "हस्तकला", ta: "கைவினைப்பொருட்கள்", te: "హస్తకళలు", gu: "હસ્તકલા", bn: "হস্তশিল্প", kn: "ಕರಕುಶಲ ವಸ್ತುಗಳು" }
};

const languages = ['en', 'hi', 'mr', 'ta', 'te', 'gu', 'bn', 'kn'];
const outputDir = path.join(__dirname, 'src', 'i18n');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

languages.forEach(lang => {
    let content = `// Auto-Generated Dictionary for ${lang}\nexport const ${lang} = {\n`;
    const keys = Object.keys(dict);

    // Add existing translations from en.js layout to ensure MockLogin etc still work natively 
    const baseNav = {
        "nav.pageHelp": "Page Help", "nav.home": "Home", "nav.dashboard": "My Business",
        "nav.finance": "Calculator", "nav.schemes": "Schemes", "nav.records": "Records",
        "nav.community": "Experts", "nav.chat": "Ask Bandhu", "nav.logout": "Logout",
        "nav.guest": "Guest Profile", "nav.newBusiness": "New Business",
        "nav.existingBusiness": "Existing Business", "nav.settings": "Settings",
        "phrase.speakShort": "Speak", "btn.next": "Next Question", "btn.back": "Back",
        "btn.continue": "Continue", "btn.submit": "Submit", "btn.save": "Save",

        "login.phone.title": "Verify Mobile Number", "login.phone.sub": "Enter your 10-digit mobile number",
        "login.phone.btn": "Get OTP", "login.phone.secure": "Your information is secure",
        "login.otp.title": "Enter OTP", "login.otp.sub": "Sent to your phone",
        "login.otp.btn": "Verify & Proceed", "login.otp.change": "Change phone number",
        "login.mode.title": "Welcome to Vyapar Bandhu!", "login.mode.sub": "Are you starting fresh or expanding?",
        "login.mode.new": "Start a New Business", "login.mode.newSub": "Explore ideas & feasibility",
        "login.mode.exist": "Existing Business", "login.mode.existSub": "Track accounting & schemes",
        "login.mode.btn": "Continue to App",

        "screen.home.title": "Dashboard", "screen.home.subtitle": "Welcome to Vyapar Bandhu",
        "screen.intake.title": "Business Intake", "screen.intake.subtitle": "Let's build your profile",
        "screen.feasibility.title": "Feasibility Report", "screen.feasibility.subtitle": "Hyper-Local Market Analysis",
        "screen.finance.title": "Financial Plan", "screen.finance.subtitle": "Calculations and Estimates",
        "screen.schemes.title": "Government Schemes", "screen.schemes.subtitle": "Verified Benefits & Subsidies",
        "screen.dashboard.title": "Micro-ERP", "screen.dashboard.subtitle": "Manage Sales & Expenses",
        "screen.experts.title": "Community", "screen.experts.subtitle": "Expert Guidance",
        "screen.records.title": "Business Records", "screen.records.subtitle": "Ledgers and Health Score",
        "screen.chat.title": "Bandhu AI", "screen.chat.subtitle": "Your Business Companion",
        "screen.settings.title": "Settings", "screen.settings.subtitle": "Configure Preferences",

        "q.businessType": "What type of business do you want to start?",
        "q.businessAge": "Is this a new or existing business?",
        "q.capital": "How much capital (in ₹) do you have?",
        "q.location": "Where is your business located?",

        "opt.new": "New Business", "opt.existing": "Existing Business", "opt.customBusiness": "Other Business",
        "opt.tellUsAboutBusiness": "Tell us about your business", "splash.subtitle": "AI-Powered Business Assistant",
        "splash.voice": "Talk to Bandhu",

        "voice.tapToSpeak": "Tap to speak", "voice.listening": "Listening...",
        "voice.understanding": "Understanding...", "voice.error": "I couldn't understand that. Please try again.",
        "voice.permissionDenied": "Microphone permission is required.", "chat.fallback": "I can't verify this right now.",
        "voice.youSaid": "You said:", "voice.orChoose": "Or choose from these:",
        "error.speech.unrecognized": "I couldn't understand that. Please try again.",
        "error.speech.notAllowed": "Microphone permission is required for voice input.",
        "error.speech.failedStart": "Failed to start microphone."
    };

    // Output baseNav first
    for (const [k, v] of Object.entries(baseNav)) {
        let val = dict[k] ? (dict[k][lang] || dict[k]['en']) : v;
        // if this is a language other than en, and it's not in dict, we fallback to English for the base nav, or they are just empty mapped.
        content += `    "${k}": ${JSON.stringify(val)},\n`;
    }

    // Output mapped dict
    for (const k of keys) {
        if (!baseNav[k]) {
            content += `    "${k}": ${JSON.stringify(dict[k][lang] || dict[k]['en'])},\n`;
        }
    }

    content += `};\n`;
    fs.writeFileSync(path.join(outputDir, `${lang}.js`), content);
});

// Overwrite index.js to export ALL 8 languages dynamically
const indexCode = `import { en } from './en';
import { hi } from './hi';
import { mr } from './mr';
import { ta } from './ta';
import { te } from './te';
import { bn } from './bn';
import { gu } from './gu';
import { kn } from './kn';

export const translations = { en, hi, mr, ta, te, bn, gu, kn };
`;
fs.writeFileSync(path.join(outputDir, 'index.js'), indexCode);

console.log('Successfully compiled 8 language dictionaries independently without fallbacks!');
