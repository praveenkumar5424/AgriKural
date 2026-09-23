import { DistrictInfo, Language } from '../types';

export const DISTRICT_NAMES_LOCALIZED: Record<string, { te: string; bn: string }> = {
  ariyalur: { te: 'అరియలూర్', bn: 'আরিয়ালুর' },
  chengalpattu: { te: 'చెంగల్పట్టు', bn: 'চেঙ্গলপট্টু' },
  chennai: { te: 'చెన్నై', bn: 'চেন্নাই' },
  coimbatore: { te: 'కోయంబత్తూర్', bn: 'কোয়েম্বাটুর' },
  cuddalore: { te: 'కడలూరు', bn: 'কাড্ডালোর' },
  dharmapuri: { te: 'ధర్మపురి', bn: 'ধর্মপুরী' },
  dindigul: { te: 'దిండిగల్', bn: 'দণ্ডিগুল' },
  erode: { te: 'ఈరోడ్', bn: 'ইরোড' },
  kallakurichi: { te: 'కల్లకురిచి', bn: 'কাল্লাকুরিচি' },
  kancheepuram: { te: 'కాంచీపురం', bn: 'কাঞ্চিপুরম' },
  kanniyakumari: { te: 'కన్యాకుమారి', bn: 'কন্যাকুমারী' },
  karur: { te: 'కరూర్', bn: 'করুর' },
  krishnagiri: { te: 'కృష్ణగిరి', bn: 'কৃষ্ণগিরি' },
  madurai: { te: 'మదురై', bn: 'মাদুরাই' },
  mayiladuthurai: { te: 'మయిలాడుతురై', bn: 'ময়িলাদুথুরাই' },
  nagapattinam: { te: 'నాగపట్టినం', bn: 'নাগাপট্টিনম' },
  namakkal: { te: 'నమక్కల్', bn: 'নমাক্কাল' },
  nilgiris: { te: 'నీలగిరి', bn: 'নীলগিরি' },
  perambalur: { te: 'పెరంబలూరు', bn: 'পেরাম্বালুর' },
  pudukkottai: { te: 'పుదుక్కోట్టై', bn: 'পুদুক্কোট্টাই' },
  ramanathapuram: { te: 'రామనాథపురం', bn: 'রামনাথপুরম' },
  ranipet: { te: 'రాణిపేట', bn: 'রানীপেট' },
  salem: { te: 'సేలం', bn: 'সালেম' },
  sivaganga: { te: 'శివగంగ', bn: 'শিবগঙ্গা' },
  tenkasi: { te: 'తెన్కాశి', bn: 'তেনকাশি' },
  thanjavur: { te: 'తంజావూరు', bn: 'তাঞ্জাভুর' },
  theni: { te: 'తేని', bn: 'থেনি' },
  thoothukudi: { te: 'తూత్తుకుడి', bn: 'থুথুকুডি' },
  tiruchirappalli: { te: 'తిరుచిరాపల్లి', bn: 'তিরুচিরাপল্লী' },
  tirunelveli: { te: 'తిరునెల్వేలి', bn: 'তিরুনেলভেলি' },
  tirupathur: { te: 'తిరుపత్తూరు', bn: 'তিরুপাত্তুর' },
  tiruppur: { te: 'తిరుప్పూర్', bn: 'তিরুপুর' },
  tiruvallur: { te: 'తిరువళ్లూరు', bn: 'তিরুভাল্লুর' },
  tiruvannamalai: { te: 'తిరువణ్ణామలై', bn: 'তিরুভান্নামালাই' },
  tiruvarur: { te: 'తిరువారూరు', bn: 'তিরুভারুর' },
  vellore: { te: 'వెల్లూరు', bn: 'ভেলোর' },
  viluppuram: { te: 'విల్లుపురం', bn: 'ভিলুপুরম' },
  virudhunagar: { te: 'విరుదునగర్', bn: 'বিরুধুনগর' },
};

export function getLocalizedDistrictName(district: DistrictInfo, lang: Language): string {
  if (lang === 'ta') return district.nameTa || district.nameEn;
  if (lang === 'hi') return district.nameHi || district.nameEn;
  if (lang === 'te') {
    return DISTRICT_NAMES_LOCALIZED[district.id]?.te || district.nameEn;
  }
  if (lang === 'bn') {
    return DISTRICT_NAMES_LOCALIZED[district.id]?.bn || district.nameEn;
  }
  return district.nameEn;
}
