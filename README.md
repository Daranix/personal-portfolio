# 📋 My Personal Portfolio 💻

Personal porfolio website using Astro & Vue for the form

## ❔ FAQ

- Why did you use Astro for create it?

Because It is a simple framework that allows SSG and SSR. In addition, when I started the portfolio I was not sure if I would use Vue or React for the contact form, Astro gave me the flexibility to use whichever one I wanted when the time came.

- You're talking about SSG but now all the content is SSR ... 

That's totally true, but the reason is that I haven't figured out (yet) how to handle translations to be SSG. Previously, for a web version of my CV I used a library but I was not happy with it. With Astro 4 they supposedly introduced tooling for i18n and I was hoping the framework would have some way to do the SSG pages on build, but after reading the documentation it seems like you either do the page 2 times in the respective languages. If you want the page to be static, for now the server processes everything to translate, it is not a big problem because the content does not change too much and can be easily fixed by adding a caching system



## 🧞 Commands


| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

