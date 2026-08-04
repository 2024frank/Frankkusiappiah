# Frank Kusi Appiah - Portfolio

Personal portfolio site for Frank Kusi Appiah, a systems builder. Live at [frankkusi.vercel.app](https://frankkusi.vercel.app).

The site presents six case studies built around real constraints: Fieldline (open-source LoRaWAN infrastructure), a PDF reader for Even G2 smart glasses with 1,600+ users, an AI community calendar pilot, the Oberlin Environmental Dashboard, ChirpStack deployment automation, and an AR hackathon prototype. Each case study covers the constraint, the decision that changed the problem, and the measurable result.

## Stack

- React 18 with TypeScript
- Vite for build and dev server
- Hand-written CSS (no framework), DM Sans and Newsreader type
- lucide-react icons
- Deployed on Vercel

## Structure

```
index.html              Meta tags, Open Graph, structured data
src/main.tsx            Entry point
src/pages/Portfolio.tsx Page layout, project cards, case-study dialog
src/data/portfolio.ts   All content: projects, experience, education
src/index.css           All styles
public/                 Images, resume PDF, favicon, social preview
```

To edit content (projects, experience, metrics, links), change `src/data/portfolio.ts` only.

## Development

```
npm install
npm run dev       # local dev server
npm run lint      # eslint
npm run build     # type-check and production build
npm run preview   # serve the production build locally
```

## Deployment

Pushes to `main` deploy automatically through Vercel.

## License

MIT
