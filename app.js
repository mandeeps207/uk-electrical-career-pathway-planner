"use strict";

const form = document.querySelector("#pathway-form");
const fields = ["stage", "problem", "experience", "employment"].map((id) => document.getElementById(id));
const results = document.querySelector("#results");

const sources = {
  ecs: { label: "ECS qualification guidance", url: "https://www.ecscard.org.uk/content/How-do-I-become-qualified-as-an-Electrician" },
  labourer: { label: "ECS Electrical Labourer guidance", url: "https://www.ecscard.org.uk/labourer" },
  net: { label: "NET candidate guidance", url: "https://www.netservices.org.uk/candidate-guidance/" },
  careers: { label: "National Careers Service electrician guidance", url: "https://nationalcareers.service.gov.uk/job-profiles/electrician" }
};

const stages = {
  none: {
    position: "You are exploring entry into electrical work and have not yet identified an electrical qualification.",
    action: "Compare apprenticeship and college or provider routes. Ask each provider for the full qualification title, workplace requirements and how the programme links to a recognised occupation.",
    caution: "A short course or an employer's job title does not by itself establish electrician competence."
  },
  level2: {
    position: "You have a Level 2 electrical technical qualification. This is a learning milestone; your next route depends on the exact award and your intended occupation.",
    action: "Ask a provider which Level 3 programme accepts your exact Level 2 award and what supervised work or evidence the full route requires.",
    caution: "Level 2 technical training does not automatically make you an electrician or establish eligibility for an ECS electrician card."
  },
  level3: {
    position: "You have a Level 3 electrical technical qualification. Check whether it is a technical certificate or part of a completed occupational programme.",
    action: "Check your full certificate title and code with the awarding body or provider, then ask what workplace competence requirements remain for your intended route.",
    caution: "Level 3 classroom study alone does not automatically demonstrate competence to work unsupervised as an electrician."
  },
  apprentice: {
    position: "You are on an apprenticeship. Your programme, employer and provider should be able to identify the occupational standard and assessment arrangements.",
    action: "Ask your training provider to confirm your exact apprenticeship standard, planned workplace evidence, gateway requirements and applicable NET assessment.",
    caution: "Do not assume the assessment for one apprenticeship is the same as AM2 for another route."
  },
  mate: {
    position: "You work in a support role described as Electrician's Mate or Electrical Labourer. Actual duties and supervision matter more than the job title.",
    action: "Write down the tasks you perform and who supervises them, then ask a prospective assessor whether those tasks could provide evidence for your chosen qualification.",
    caution: "A Mate or Labourer title does not guarantee that the work counts towards an NVQ. The ECS Electrical Labourer card describes a supervised support role."
  },
  competency: {
    position: "You are enrolled on an NVQ or another recognised competency qualification. Your assessor and provider can explain the evidence needed for your specific award.",
    action: "Ask your assessor for a unit-by-unit evidence plan and confirm which tasks, observations and records are still outstanding.",
    caution: "Enrolment is not completion, and the suitability of workplace evidence must be checked against the actual qualification."
  },
  completed: {
    position: "You say you have completed a recognised occupational competency qualification. The exact award and any other card requirements still need checking.",
    action: "Gather your certificate title and code, relevant assessment records and current ECS requirements for the occupation and card you are considering.",
    caution: "Completion of one qualification does not by itself confirm eligibility for a particular ECS card."
  },
  unsure: {
    position: "Your qualification stage is unclear. Establishing exactly what you hold is the most useful first step.",
    action: "Find the full names, codes and awarding bodies on your certificates, and ask a provider to explain what each award covers.",
    caution: "Similar sounding Level 3 awards can represent different kinds of training or assessment."
  }
};

const problems = {
  route: {
    bottleneck: "You need a clear route from training into the occupational role you want, including its work-based requirements.",
    action: "Compare two realistic programmes and ask each provider which recognised occupation the route supports, what work access is needed and which assessments apply."
  },
  job: {
    bottleneck: "Finding an employer willing to offer suitable supervised entry-level work may be the immediate challenge.",
    action: "Search for apprenticeships and supervised entry roles, and ask employers what duties, support and progression they actually offer."
  },
  experience: {
    bottleneck: "Your access to relevant, supervised electrical work may limit how you develop and evidence practical competence.",
    action: "Ask your provider or assessor what kinds of supervised work would be relevant to your exact route, then use that description when approaching employers."
  },
  competence: {
    bottleneck: "The link between your current award and a recognised competency qualification is unclear.",
    action: "Ask a provider or assessor to map your exact qualification to the competency requirements of your intended occupation."
  },
  ecs: {
    bottleneck: "ECS has distinct cards and requirements; the right question is which occupation and card criteria apply to your evidence.",
    action: "Read the current ECS page for the occupation and card you are considering, then list the documents and requirements you need to verify directly with ECS."
  },
  am2: {
    bottleneck: "You need to identify the assessment attached to your actual programme and when you would be ready for it.",
    action: "Ask your provider which NET assessment applies to your route—such as AM2, AM2S or AM2E—and review NET's candidate and readiness guidance."
  },
  next: {
    bottleneck: "The next milestone has not yet been defined against your exact qualification and work situation.",
    action: "Write down your current certificates, programme and duties, then ask a provider to identify the next recognised milestone for your intended occupation."
  }
};

function accessAction(experience, employment) {
  if (experience === "no") return "Make a plan for supervised workplace access. Ask your provider about employer links and ask prospective employers what practical tasks and supervision are available.";
  if (experience === "sometimes") return "Check whether your intermittent work covers the tasks and evidence your route requires; ask your assessor what gaps remain.";
  if (experience === "unsure") return "Clarify whether the work available to you is real, supervised electrical work relevant to your chosen qualification; ask an assessor before relying on it.";
  if (employment === "temporary") return "Because your work is temporary or agency based, ask an assessor how to record duties, supervisors and evidence across placements.";
  if (employment === "placement") return "Check with your placement supervisor and assessor which tasks are relevant and how observations or records can be captured.";
  if (employment === "no") return "You report access to workplace experience but no electrical employment. Clarify how that access is arranged, supervised and documented with a provider or assessor.";
  if (employment === "unsure") return "Clarify your work status and who supervises your electrical tasks before planning any workplace assessment.";
  return "Keep a record of the supervised tasks you do and ask your provider or assessor which of them are relevant to your chosen route.";
}

function updateProgress() {
  const count = fields.filter((field) => field.value !== "").length;
  document.querySelector("#progress-text").textContent = `${count} of 4`;
  document.querySelector("#progress-track").setAttribute("aria-valuenow", String(count));
  document.querySelector("#progress-fill").style.width = `${count * 25}%`;
}

function setList(selector, items, ordered = false) {
  const list = document.querySelector(selector);
  list.replaceChildren();
  items.forEach((item) => {
    const li = document.createElement("li");
    if (ordered) {
      li.textContent = item;
    } else {
      const link = document.createElement("a");
      link.href = sources[item].url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = `${sources[item].label} (external)`;
      li.append(link);
    }
    list.append(li);
  });
}

form.addEventListener("change", updateProgress);
form.addEventListener("reset", () => {
  results.hidden = true;
  requestAnimationFrame(updateProgress);
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const answers = Object.fromEntries(fields.map((field) => [field.name, field.value]));
  const stage = stages[answers.stage];
  const problem = problems[answers.problem];
  const access = accessAction(answers.experience, answers.employment);

  let bottleneck = problem.bottleneck;
  if (answers.experience === "no" && answers.problem !== "experience") bottleneck += " You also report no current access to real workplace experience.";
  if (answers.experience === "sometimes" && answers.problem !== "experience") bottleneck += " Your access to practical work is intermittent.";
  if (answers.employment === "no" && answers.problem !== "job") bottleneck += " Finding an electrical role may also be part of the next step.";

  document.querySelector("#result-position").textContent = stage.position;
  document.querySelector("#result-bottleneck").textContent = bottleneck;
  document.querySelector("#result-caution").textContent = stage.caution;
  setList("#result-actions", [problem.action, access, stage.action], true);

  const relevantSources = new Set(["ecs"]);
  if (["mate"].includes(answers.stage)) relevantSources.add("labourer");
  if (["am2", "competence"].includes(answers.problem) || ["apprentice", "competency"].includes(answers.stage)) relevantSources.add("net");
  if (["route", "job", "next"].includes(answers.problem) || ["none", "unsure"].includes(answers.stage)) relevantSources.add("careers");
  if (relevantSources.size === 1) relevantSources.add("net");
  setList("#result-sources", [...relevantSources]);

  results.hidden = false;
  results.focus();
});

document.querySelector("#print-results").addEventListener("click", () => window.print());
