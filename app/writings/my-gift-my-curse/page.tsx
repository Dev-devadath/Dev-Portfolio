import Link from "next/link";
import { Caveat } from "next/font/google";
import { ThemeToggle } from "../../components/ThemeToggle";
import type { Metadata } from "next";

const caveat = Caveat({ subsets: ["latin"], weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "This is my gift, My curse..",
  description:
    "A mini story about a habit of taking things apart. Toys, robots, jobs, my entire life, and how breaking things became the way I figure them out.",
  keywords: [
    "Devadath",
    "Writings",
    "Robotics",
    "Humanoid Robot",
    "TinkerHub",
    "Bangalore",
    "Maker",
    "Origin Story",
  ],
  openGraph: {
    title: "This is my gift, My curse.. | Devadath",
    description:
      "A mini story about a habit of taking things apart, and how breaking things became the way I figure them out.",
    url: "https://devadath.dev/writings/my-gift-my-curse",
    type: "article",
    publishedTime: "2026-07-10",
    authors: ["Devadath S"],
    images: [
      {
        url: "/avatar.jpg",
        width: 800,
        height: 600,
        alt: "Devadath",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "This is my gift, My curse.. | Devadath",
    description:
      "A mini story about a habit of taking things apart, and how breaking things became the way I figure them out.",
    images: ["/avatar.jpg"],
  },
};

function Era({
  chip,
  children,
}: {
  chip: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span
        className="absolute -left-[29px] md:-left-[45px] top-1 w-2.5 h-2.5 rounded-full border-2 border-foreground bg-background"
        aria-hidden="true"
      ></span>
      <p className="mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary border border-dashed border-gray-300 dark:border-gray-700 rounded px-2 py-1">
          {chip}
        </span>
      </p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default function MyGiftMyCurse() {
  return (
    <main className="min-h-screen flex justify-center px-6 py-12">
      <article className="max-w-2xl w-full">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-14">
          <Link
            href="/writings"
            className="font-mono text-xs tracking-widest text-secondary hover:text-foreground transition-colors"
          >
            ← WRITINGS
          </Link>
          <ThemeToggle />
        </div>

        {/* Log header */}
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary mb-6">
          Teardown log · no. 001 · 10 Jul 2026
        </p>

        <h1 className="teardown-title text-4xl md:text-6xl font-black leading-tight tracking-tight">
          This is my gift,
          <br />
          my{" "}
          <span className="whitespace-nowrap">
            <span className="sr-only">curse</span>
            <span className="curse-letters" aria-hidden="true">
              <span>c</span>
              <span>u</span>
              <span>r</span>
              <span>s</span>
              <span>e</span>
            </span>
          </span>
          ..
        </h1>
        {/* cut-here divider */}
        <div
          className="flex items-center gap-3 font-mono text-xs text-secondary my-12 select-none"
          aria-hidden="true"
        >
          ✂<span className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-700"></span>
          open along this line
        </div>

        {/* Lead */}
        <p className="text-xl md:text-2xl leading-relaxed font-medium mb-12">
          I have always had a habit of{" "}
          <span className="marker">taking things apart</span>.
        </p>

        {/* The assembly line */}
        <section className="relative border-l border-dashed border-gray-300 dark:border-gray-700 pl-6 md:pl-10 space-y-12 text-lg leading-relaxed">
          <Era chip="Age ~8 · Anything with a motor">
            <p>
              As a kid, it was toys, RC cars, and anything with a motor
              inside, and I built something new with it. Most kids do that. But what
              really got me was this feeling of{" "}
              <span className="marker">
                understanding something by breaking it
              </span>
              , even when it was working perfectly fine. I wanted to see what
              was possible if I did it my own way instead. That became a
              pattern in my life, not just with toys.
            </p>
          </Era>

          <Era chip="Age 10 · First lines of code">
            <p>
              I started coding when I was 10 or 11 years old. Around then I got
              hooked on the idea of machines that think, and robots
              specifically.
            </p>
          </Era>

          <Era chip="Age 14 · Robot no. 1">
            <p>
              At 14 I had built what I proudly called a robot. It had a head,
              two arms, and could wave back and say hello using a simple
              prediction model. I thought it was the coolest thing in the
              world.
            </p>
            <p
              className={`${caveat.className} text-2xl text-secondary -rotate-2`}
            >
              (still the coolest thing, honestly)
            </p>
          </Era>

          <Era chip="Same era · First clients">
            <p>
              Around that time I also figured out I did not want to keep asking
              my parents for money, so I started freelancing with the tech
              skills I had. I still remember calling a local resort in my town
              offering to build them a website, and they hung up on me the
              moment they realised I was a kid. Eventually I got past that and started
              getting international and Indian clients through freelancing.
            </p>
          </Era>

          <Era chip="The davinci era · 17 DOF">
            <p>
              I kept working on my robot alongside all this. When GPT&apos;s
              first model, text-davinci, came out, I emailed them and got 15
              dollars in API credits to try it. I wanted to put that inside my
              robot so it could do more than just wave, so it could actually
              do physical tasks and{" "}
              <span className="marker">make a person feel something</span>,
              like a WOW or just happiness.
            </p>
            <p>
              I built a 17 DOF humanoid robot that could see and understand a
              person, talk with them, and do physical interactions. That
              project got me the Best Industrial Award from Bharat Electronics
              India, first place at the Indian Science Fair, and the Youngest
              Innovator Award from the Government, all while I was still going
              through my 10th board exams.
            </p>
          </Era>

          <Era chip="11th & 12th · Barely in class">
            <p>
              My parents were not happy that I was not focusing on school, but
              I managed to convince them it was okay. I kept freelancing and
              taking on projects, and right after my exams I got a job offer
              from a company. It was a pretty good offer, and it let me work
              whenever I wanted, which is one of the nice things about tech. So
              I joined them while still in 11th and 12th grade.
            </p>
            <p>
              I barely went to class. Instead I was getting invited to tech
              events and programs outside my hometown, and each time I went, I
              realised there was a whole world outside that made everything I
              knew feel small.
            </p>
          </Era>

          <Era chip="The pattern, again">
            <p>
              That is the pattern again. I cannot stay in something once it
              starts feeling like a flow with{" "}
              <span className="marker">nothing left to break</span>. After 12th
              grade I told my parents I was not going to college. It took a lot
              of convincing, and I had mentors talk to them on my behalf. They
              eventually accepted it, partly because I already had a job that
              paid well.
            </p>
          </Era>

          <Era chip="Kochi · TinkerHub">
            <p>
              I moved out of my hometown on my own to Kochi, the tech hub of my
              state. There I found TinkerHub, one of the best maker communities
              in India. It will always have a special place in me. They helped
              me with projects, introduced me to people who thought like me,
              and helped me grow.
            </p>
            <p>
              But eventually the same feeling came back. I got comfortable.
              Nothing new was happening. I felt like I had hit a limit and
              there was nothing left to break there.
            </p>
          </Era>

          <Era chip="Now · New city, zero plan">
            <p>
              Soo yeah, I paused it and moved again.. and this time with
              nothing. Quit my job, moved completely to a different state with
              nothing lined up. New place, new people, new culture.
            </p>
            <p className="text-2xl font-bold">I moved to Bangalore.</p>
          </Era>
        </section>

        {/* Closing */}
        <div className="mt-16 text-lg leading-relaxed space-y-4">
          <p>
            I grew up believing in fucking around to figure things out, and it
            was the one thing that actually worked in my life. Not theory, not
            planning, not waiting until we felt ready. Every robot I built,
            every client I got, every city I moved to with nothing planned,
            came from just doing it and figuring it out on the way.
          </p>
          <p>So yeah, I truly believe that..</p>
        </div>

        <blockquote className="mt-12 -rotate-1">
          <p className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            The more you <span className="marker">fuck around</span>,
            <br />
            the more you <span className="marker">figure out</span>!
          </p>
        </blockquote>

        <p className={`${caveat.className} text-4xl mt-10 -rotate-2`}>- Dev</p>

        {/* Footer */}
        <footer className="mt-20 flex items-center justify-between text-sm text-secondary">
          <span>© Devadath</span>
          <Link
            href="/writings"
            className="font-mono text-xs tracking-widest hover:text-foreground transition-colors"
          >
            ← BACK TO WRITINGS
          </Link>
        </footer>
      </article>
    </main>
  );
}
