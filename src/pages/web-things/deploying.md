---
title: "Deploying"
description: 'A running list of the questions I have to remember to ask myself when deploying a new app to a new environment.'
date: 2024-02-13
parent: 'Web Things'
img_path: /img/web-things/
thumb: facepalm.jpg
---
  {% figure img_path "facepalm.jpeg" "Face, meet palm." %}

At one time, deployments were simply uploading files via FTP. When we weren't editing live files in production. We were but simple cavedwellers, and those were interesting times.

Since then we've developed a lot more rigor in our deployments and have greatly improved their reliability, repeatability and security.

We've also introduced a lot of extra steps, and where there are extra steps, there's a sure likelihood I've missed one. Or 12.

So, for my future self, I am starting a running list of questions to ask myself as I first deploy a new application into a new environment.

_Note: I recognize that many of these questions are painfully basic and some readers may feel compelled to tell me a better way of doing things. It's OK if you don't._

----------------------------------------

- Did you set the environment variables in all the environments?
- _How_ did you set all the environment variables in all the environments?
- How are you _getting_ all the environment variables in all the environments?
- If you put them in a flat file, did you remember to put that in `.gitignore`?
- Did you remember to `pip freeze` the requirements?
- Do you remember the correct command to launch the app? Hint: for fly.io, it's `fly launch`
- Did you remember that there's a different command to deploy that app? Hint: `fly deploy`
- Did you remember to pre-install the dependencies in your dockerfile that your app will need to put itself together?
- Do you remember that you probably need to copy requirements.txt to do that for it to work? 
```
COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
```
- Do you need to rebuild the app because you changed the dockerfile?
- Did you forget about your database settings?
- Did you figure out how you're going to send email? You know you're gonna need to send emails, right?
- Did you figure out how to receive emails?
- Did you remember to put the email service API keys in your secrets, too?


### Why did I do it?

Because I had a need, and because I thought it would be interesting to see how close generated code could get.

### What did I learn?

Generated code gets you about 80% there and you still need a human for the remainder. But that 80% may be the difference between a problem that gets solved and one that doesn't.


### Where is it?
- [The repo](https://github.com/tBaxter/markitup2)
