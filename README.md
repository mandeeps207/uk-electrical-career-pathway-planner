# UK Electrical Career Pathway Planner

A free, static, open-source educational tool for UK electrical trainees and adult career changers. Four answers generate a short checklist covering your current position, a likely bottleneck, three things to investigate, assumptions to avoid and official sources to check. The page also contains readable guidance when JavaScript is unavailable.

## Who it is for

People comparing electrical training routes, looking for supervised workplace experience, or trying to understand how technical qualifications, recognised occupational competence, NET assessments and ECS cards relate to one another.

## Run locally

Open `index.html` in a modern browser. There is no build step, server, package manager, account, API or database. You can also serve the folder with any static file server, for example `python -m http.server 8000`, then open `http://localhost:8000/`.

The site uses only HTML, CSS and vanilla JavaScript. Answers are processed in the browser and are not sent or saved anywhere. The print button uses the browser's print dialog.

## Files

- `index.html` — crawlable content, accessible form, official links and structured data.
- `styles.css` — responsive layout and print styles.
- `app.js` — progress indicator and personalised educational checklist.
- `robots.txt` and `sitemap.xml` — crawl directives and a single-page sitemap.

## Limitations

This is an educational planner, not an official ECS eligibility checker, qualification awarding body, AM2 eligibility checker, or source of legal or career advice. It cannot inspect certificates, assess workplace evidence, decide which NET assessment applies, or guarantee that a qualification or role meets a particular route. Requirements can change. Check your exact qualification and pathway with ECS, NET, the awarding body, your assessor and your training provider before making decisions.

The sitemap and `robots.txt` currently assume publication at `https://elec.training/uk-electrical-career-pathway-planner/`. Change both URLs if you publish elsewhere.

## Licence

MIT. See [LICENSE](LICENSE).
