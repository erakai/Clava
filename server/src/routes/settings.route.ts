import { verifyUser } from "config/auth";
import { getSettings, setSettings } from "controllers/settings.controller";
import { Router } from "express";

const settingsRouter = Router()

/*
Settings Routes:
  - /settings GET (club_id) returns settings for that club
  - /settings POST (club_id, all settings fields) updates settings for that club

Default settings are declared in settings.controller.ts and created
when a club is created in createClub in club.controller.ts

If you want to modify available settings you have to update:
  - server/types/settings.d.t.s
  - server/models/settings.model.ts
  - server/controllers/settings.controller.ts
  - client/types/settings.d.ts
  - And then obviously the settings page
*/

settingsRouter.get('/', verifyUser, getSettings)
settingsRouter.post('/', verifyUser, setSettings)

export default settingsRouter