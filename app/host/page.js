import Image from "next/image";
import Link from "next/link";
import hostImage from "@/public/admin.png";
import { 
  ShieldCheck, 
  Award, 
  Calendar, 
  Heart, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight,
  Flag,
  Mountain,
  Compass,
  Sparkles
} from "lucide-react";
import BookingLayout from "../_components/booking/BookingLayout";

export const metadata = {
  title: "Meet Your Host | Balvinder Kashiv | The Retreat Cottage",
  description: "Learn about the heart behind The Retreat Cottage. Meet Balvinder Kashiv, a retired Indian Army JCO with 28+ years of dedicated service.",
};

export default function HostPage() {
  return (
    <BookingLayout>
      <div className="min-h-screen bg-primary-950 text-white selection:bg-accent-500 selection:text-primary-950">
        
        {/* Dynamic Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-primary-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 lg:py-32">
          
          {/* Header Section */}
          <div className="max-w-4xl mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 text-xs font-black uppercase tracking-[0.3em] mb-8">
              <Flag className="h-4 w-4" />
              Serving Excellence
            </div>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8">
              Meet Your Host. <br />
              <span className="italic font-light text-accent-300">Balvinder Kashiv.</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-primary-300 text-lg sm:text-xl font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-accent-500" />
                Army Retired JCO
              </div>
              <div className="w-1 h-1 bg-primary-700 rounded-full hidden sm:block" />
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6 text-accent-500" />
                28+ Years of Service
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            
            {/* Biography & Story */}
            <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold border-l-4 border-accent-500 pl-6 py-2">
                  A Legacy of <span className="italic">Service & Honor</span>
                </h2>
                
                <div className="space-y-6 text-primary-200 text-lg leading-relaxed font-light">
                  <p>
                    Hospitality at The Retreat Cottage isn't just a business—it's an extension of a lifetime dedicated to discipline, integrity, and the service of others.
                  </p>
                  <p>
                    <strong>Balvinder Kashiv</strong> served across various ranks in the Indian Army for over <strong>28 years</strong>, retiring as a <strong>Junior Commissioned Officer (JCO)</strong> with a legacy of guarding the nation's borders with unwavering commitment. 
                  </p>
                  <p>
                    Today, he brings that same standard of excellence to the Himalayan valleys. From ensuring the highest standards of hygiene in our Pure Veg kitchen to the meticulous upkeep of our premium rooms, his attention to detail is what makes every stay at The Retreat Cottage exceptional.
                  </p>
                </div>
              </div>

              {/* Service Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Security & Trust",
                    desc: "Your safety and privacy are our top priorities, managed with military precision."
                  },
                  {
                    icon: Heart,
                    title: "Genuine Care",
                    desc: "Warmth that comes from a genuine desire to serve and welcome travelers."
                  },
                  {
                    icon: Compass,
                    title: "Local Wisdom",
                    desc: "Deep knowledge of the Himalayan trails and the neighborhood's heritage."
                  },
                  {
                    icon: Sparkles,
                    title: "Excellence",
                    desc: "Highest standards in cleanliness, quality, and guest experience."
                  }
                ].map((value, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-500/30 transition-all duration-300">
                    <value.icon className="h-8 w-8 text-accent-500 mb-4" />
                    <h3 className="font-bold text-white mb-2">{value.title}</h3>
                    <p className="text-primary-400 text-sm font-light leading-relaxed">{value.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual/Personal Touch */}
            <div className="space-y-8 lg:space-y-12 animate-in fade-in slide-in-from-right-8 duration-1000 delay-400">
              <div className="relative group">
                {/* Image Container */}
                <div className="relative aspect-4/5 sm:aspect-square lg:aspect-4/5 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src={hostImage}
                    alt="Balvinder Kashiv - Your Host at The Retreat Cottage"
                    fill
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary-950/60 via-transparent to-transparent opacity-60" />
                </div>

                {/* Quote Card - Overlay on Desktop, Below on Mobile */}
                <div className="relative lg:absolute lg:-bottom-6 lg:left-6 lg:right-6 mt-6 lg:mt-0 z-20">
                  <div className="bg-primary-900/60 lg:bg-primary-950/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 rounded-[2rem] lg:rounded-3xl shadow-2xl">
                    <h3 className="text-xl sm:text-2xl font-black mb-0.5 text-white">Balvinder Kashiv</h3>
                    <p className="text-accent-400 font-bold text-[10px] sm:text-xs uppercase tracking-widest mb-4">Host & Proprietor</p>
                    <div className="h-px bg-white/10 w-full mb-5" />
                    <p className="text-white/90 italic font-light leading-relaxed text-sm sm:text-base">
                      "After nearly three decades in the Indian Army, I found my peace here in the pines of Dharampur. I invite you to experience the same tranquility at our retreat."
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact & Interaction */}
              <div className="lg:mt-20 bg-accent-500 rounded-[2.5rem] p-8 sm:p-10 text-primary-950 shadow-2xl">
                <h3 className="text-3xl font-black mb-6 leading-tight">Plan Your Visit <br /> With Your Host</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-950/10 flex items-center justify-center">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-primary-900/60 font-black uppercase text-[10px] tracking-widest">Direct Call</p>
                      <p className="font-bold text-lg">+91 99060 39157</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-950/10 flex items-center justify-center">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-primary-900/60 font-black uppercase text-[10px] tracking-widest">Email Inquiry</p>
                      <p className="font-bold text-lg">admin@retreatcottage.in</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/retreats"
                  className="flex items-center justify-center gap-3 w-full bg-primary-950 text-white py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl"
                >
                  Explore The Retreats
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Values Section */}
          <div className="mt-32 pt-20 border-t border-white/10 text-center space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <div className="max-w-3xl mx-auto">
              <Mountain className="h-12 w-12 text-accent-500 mx-auto mb-8" />
              <h2 className="text-4xl sm:text-5xl font-black mb-8">Guided by <span className="text-accent-400">Integrity.</span></h2>
              <p className="text-primary-300 text-lg sm:text-xl font-light leading-relaxed">
                Whether you're looking for a quiet solo escape or a grand family reunion, 
                Balvinder and his dedicated team ensure that every detail is managed with precision 
                and every guest is treated like family.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Army Service", value: "28+ Yrs" },
                { label: "Guest Satisfaction", value: "5.0 Rating" },
                { label: "Location", value: "Dharampur" },
                { label: "Philosophy", value: "Excellence" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <p className="text-accent-400 text-2xl sm:text-3xl font-black tracking-tight">{stat.value}</p>
                  <p className="text-primary-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </BookingLayout>
  );
}
