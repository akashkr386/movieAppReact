import React from "react";

function Contact() {
  return (
    <div className="p-[5%]">
      <h1 className="text-4xl text-zinc-200 font-black hover:underline underline-offset-1">
        Contact Us
      </h1>
      <p className="ml-[5%] text-zinc-400 text-justify mt-10 text-xl">
        We’d love to hear from you! At MoviesDB, we're always striving to
        improve and bring you the best movie discovery experience. Whether you
        have questions, feedback, or suggestions, feel free to reach out to us.
        Your thoughts and opinions are important in helping us grow.
      </p>
      <br />
      <div className="ml-[5%]">
        <h2 className="text-zinc-300 mt-5 text-2xl">Get in touch with us: </h2>
        <div className="pl-[5%] mt-5 text-zinc-300">
          <h1 className="mt-3">Name: Akash Kumar</h1>
          <h1 className="mt-3">Email: anandakash334@gmail.com</h1>
          <div className="mt-5 text-zinc-400">
            {/* Facebook Icon */}
            <a
              target="_blank"
              href="https://www.facebook.com/people/Akash-Anand/pfbid0BoNYB1cMmMzJrXLSRt6rr1ZRFikDtejkCQKUWg6sEKvewXsEMA6agiE1LgcE8Axil/"
            >
              <i className="hover:scale-125 transition-transform duration-300 ri-facebook-circle-fill text-3xl"></i>
            </a>

            {/* Instagram Icon */}
            <a
              target="_blank"
              href="https://www.instagram.com/akash_kr_003"
            >
              <i className="hover:scale-125 transition-transform duration-300 ml-3 ri-instagram-fill text-3xl"></i>
            </a>
          </div>
          <h1 className="mt-5 mb-5">
            Address: 123 Movie Lane, Cinemaville, Filmstate, 45678
          </h1>
        </div>
      </div>
      <p className="ml-[5%] text-zinc-400 text-justify mt-10 text-xl">
        If you have a specific query or need help navigating the website, don't
        hesitate to contact us through the email provided. We’re here to assist
        you and make your MoviesDB experience smooth and enjoyable.
      </p>
    </div>
  );
}

export default Contact;
