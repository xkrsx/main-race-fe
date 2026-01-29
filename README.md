# MAIN RACE (FE)
Frontend code for MegaK (14 months long Javascript course) individual final project.
* http://kryzys.networkmanager.pl/

## DESCRIPTION
This final project is an app to manage Main Race that took place during Polish Cycle Messenger Championships in Szczecin, Poland (yes, such a race exists). I was a main organiser of this event in August 2023.
Racers come to pick-up checkpoint and ask for verification code that they can use on their phone. This unlocks a possibility to type another verification code at their next stop, drop-off checkpoint, where they are heading. After typing in both codes the job is finished and racer gets points for it. Unfinished jobs result in minus points.

## BACKEND
Backend repository can be found here: https://github.com/xkrsx/main-race-be

## VIEWS
### Home
link to Championship's main website (original website unavailable anymore; archived website: https://web.archive.org/web/20231109213523/https://pcmc2023.pl/).

### Race
application's homepage (two views: logged and not logged in)

* not logged in: racers have to log in using their credentials (racing number + 4 digit password; see WORKING LOGIN CREDENTIALS below), they can view or hide password using button.
<p align="center">
  <img src="https://user-images.githubusercontent.com/98549349/231608201-6cec106e-22e6-4649-9d1f-c7a5ef802292.png" alt="Screen Shot 2023-04-13 at 01 29 08"/>
  <img src="https://user-images.githubusercontent.com/98549349/231608105-ef4dff66-6001-4f6a-b5be-579a3e99fbb4.png" alt="Screen Shot 2023-04-13 at 01 29 23"/>
</p>

* logged in: racers can get/open new job (max. 5 opened/unifinished in the same time), see lists of unfinished and finished jobs and short racer info (racing number, name, category, points: total, minus, sum).
<p align="center">
  <img src="https://user-images.githubusercontent.com/98549349/231608241-808e6885-a2cf-4bd4-b1fd-f79258276e74.png" alt="Screen Shot 2023-04-13 at 01 30 29"/>
</p>

### Results
list refreshes every five minutes.
<p align="center">
  <img src="https://user-images.githubusercontent.com/98549349/231608322-a2ca4df7-16a2-43f9-9d29-889dc2b5c175.png" alt="Screen Shot 2023-04-13 at 01 33 42"/>
</p>

## WORKING LOGIN CREDENTIALS
('couriers' table)
<p align="center">
  <img src="https://user-images.githubusercontent.com/98549349/231605610-0c581f95-41aa-4e2e-9d06-6cc22a82d724.png" alt="Screen Shot 2023-04-13 at 01 07 39"/>
</p>

## VERIFICATION CODES FOR JOBS
('jobs' table)
<p align="center">
  <img src="https://user-images.githubusercontent.com/98549349/231605733-3bcec061-dfc4-43c6-854b-009d6e05866e.png" alt="Screen Shot 2023-04-13 at 01 07 25"/>
</p>

## STARTED/UNFINISHED JOB
('couriers_jobs' table)
<p align="center">
  <img src="https://user-images.githubusercontent.com/98549349/231607004-4f1acddf-1435-4d5a-90e5-efad4eb20aa8.png" alt="Screen Shot 2023-04-13 at 01 07 51"/>
</p>

## ISSUES
* LOGGING: Unfortunately, due to family issues (my father was diagnosed with acute cancer two weeks prior the deadline) I had to make a decision to focus on the project, not Nest.js course learning stage, when I would have had a chance to learn about proper methods. Therefore logging and validation is extremely simple, but it works. :) Using incorrect credentials does not let to Race/logged in view, but instead directs to login panel.
* ADMIN: due to above-mentioned family situation I could only start working on this feature in BE, but not in FE. Thus, this view is currently empty.
