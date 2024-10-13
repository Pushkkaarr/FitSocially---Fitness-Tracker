import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import TypingEffect from '../helpers/TypingEffect';


const images = [
  "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/533446/pexels-photo-533446.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/949132/pexels-photo-949132.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/39671/physiotherapy-weight-training-dumbbell-exercise-balls-39671.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg?auto=compress&cs=tinysrgb&w=600"
];
const LandingPage = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white dark:bg-blue-950 shadow-md">
        <Link className="flex items-center justify-center" to="#">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600 dark:text-blue-400">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
          <span className="ml-2 text-2xl font-bold text-blue-600 dark:text-blue-400">FitSocially</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4" to="/email">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4" to="/aboutUs">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 hover:underline underline-offset-4" to="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
      <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 flex transition-transform duration-1000" style={{
            transform: `translateX(-${bgImageIndex * 100}%)`,
          }}>
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-full h-[500px] bg-cover bg-center" style={{
                backgroundImage: `url(${image})`,
                height: '500px',
              }}></div>
            ))}
          </div>

          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg">
                  <TypingEffect text="Get Fit, Stay Social" speed={190} />
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl drop-shadow">
                  FitSocially combines fitness and social networking to help you achieve your health goals while connecting with like-minded individuals.
                </p>
              </div>
              <div className="flex justify-center space-x-4">
                <Link to="/email">
                  <button className="bg-red-600 text-white hover:bg-red-500 px-4 py-2 rounded">Try Out</button>
                </Link>
                <Link to="/diet">
                  <button className="text-white border border-white hover:bg-blue-600 px-4 py-2 rounded">Learn More</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-blue-950">
  <div className="container px-4 md:px-6 mx-auto">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-blue-600 dark:text-blue-400 "> <TypingEffect text="FEATURES" speed={190} /></h2>
    <div className="grid gap-6 lg:grid-cols-3">
      {[
        { title: "Social Media & Group Chat", icon: "users", description: "Connect with fitness enthusiasts, join group chats, and motivate each other on your fitness journey." },
        { title: "Daily Workout Plans", icon: "dumbbell", description: "Choose from easy, medium, or hard workout plans with instructional pictures for each exercise." },
        { title: "Customized Diet Plans", icon: "utensils", description: "Select between strict and normal diet plans tailored to your fitness goals and preferences." },
        { title: "Streak Tracking", icon: "flame", description: "Stay motivated by maintaining your workout and diet streaks. Earn rewards for consistency!" },
        { title: "Progress Charts", icon: "bar-chart-2", description: "Visualize your fitness progress with detailed charts and analytics." },
        { title: "Water & Calorie Tracking", icon: "droplet", description: "Monitor your daily water intake and calorie consumption with easy-to-use meters." },
        { title: "Exercise Videos", icon: "youtube", description: "Access a library of exercise videos powered by YouTube API to perfect your form." },
        { title: "Workout Music", icon: "music", description: "Enjoy curated playlists and songs to keep you pumped during your workouts." },
        { title: "Ranking System", icon: "award", description: "Earn tags like member, elder, co-leader, and owner as you progress in your fitness journey." },
      ].map((feature, index) => (
        <div key={index} className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 p-6 rounded-lg transition-transform transform hover:scale-105 hover:bg-gradient-to-r from-blue-400 to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-800">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2 transition-transform transform hover:scale-110 hover:drop-shadow-lg">
              <path d={getIconPath(feature.icon)}></path>
            </svg>
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 glow-text">{feature.title}</h3>
          </div>
          <p className="text-blue-600 dark:text-blue-200">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>




<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white animate-in-out">
          Stay Fit, Stay Connected
        </h2>
        <p className="max-w-[900px] text-blue-100 md:text-xl lg:text-base xl:text-xl animate-in-out">
          FitSocially brings together the best of both worlds - fitness and social networking. Achieve your health goals while building meaningful connections with others on the same journey.
        </p>
      </div>
    </div>
  </div>
</section>





        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="grid gap-6 lg:grid-cols-2 items-center">
      <div className="flex flex-col justify-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-600 dark:text-blue-400">Rewards for Your Dedication</h2>
        <p className="max-w-[600px] text-blue-700 dark:text-blue-200 md:text-xl lg:text-base xl:text-xl">
          Maintain your streak for 1-2 months and unlock exclusive discounts on premium gym products like creatine supplements and more!
        </p>
        <div className="bg-white dark:bg-blue-950 border border-blue-200 dark:border-blue-700 p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2 transition-transform transform hover:scale-110 hover:drop-shadow-lg">
              <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"></path>
              <path d="M12 12v6"></path>
              <path d="M12 12l4 2 4-2"></path>
              <path d="M12 12l-4 2-4-2"></path>
              <path d="M12 6v6"></path>
              <path d="M12 6l4 2 4-2"></path>
              <path d="M12 6l-4 2-4-2"></path>
            </svg>
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">Coupon System</h3>
          </div>
          <p className="text-blue-600 dark:text-blue-200">
            Earn coupons and discounts on fitness products as you maintain your workout streak.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <img
          src={"https://w0.peakpx.com/wallpaper/101/67/HD-wallpaper-bodybuilder-gym-black-man-muscles-fitness-thumbnail.jpg"}
          alt="Rewards Illustration"
          width={400}
          height={400}
          className="rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
        />
      </div>
    </div>
  </div>
</section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Join FitSocially Today</h2>
                <p className="max-w-[600px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your journey towards a healthier, more connected you. Sign up now and experience the perfect
                  blend of fitness and social networking.
                </p>
                <div className="w-full max-w-sm space-y-2">
                  <Link to="/email">
                    <button className="w-full bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded">Get Started</button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={"https://w0.peakpx.com/wallpaper/244/782/HD-wallpaper-social-networks-background-with-social-networks-logos-social-media-twitter-facebook-youtube-social-media-concepts-thumbnail.jpg"}
                  alt="Join FitSocially Illustration"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-600 dark:text-blue-400">© 2024 FitSocially. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-blue-600 dark:text-blue-400" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-blue-600 dark:text-blue-400" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

function getIconPath(icon) {
  switch (icon) {
    case 'users': return 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75 M6 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z';
    case 'dumbbell': return 'M6.5 6.5L17.5 17.5 M6.5 17.5L17.5 6.5 M4 20l2.5-2.5 M18 2l2.5 2.5 M4 2l2.5 2.5 M20 20l-2.5-2.5';
    case 'utensils': return 'M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2 M7 2v20 M19 10V2 M19 10a3 3 0 0 1-3 3H9 M21 21V10h-4';
    case 'flame': return 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z';
    case 'bar-chart-2': return 'M18 20V10 M12 20V4 M6 20v-6';
    case 'droplet': return 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z';
    case 'youtube': return 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z';
    case 'music': return 'M9 18V5l12-2v13 M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z';
    case 'award': return 'M12 15l-3 3m0 0l-3-3m3 3v-6 M12 15l3 3m0 0l3-3m-3 3v-6 M8.21 13.89L7 23l5-3 5 3-1.21-9.12';
    default: return '';
  }
}

export default LandingPage;
