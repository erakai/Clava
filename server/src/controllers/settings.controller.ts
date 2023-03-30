import to from 'await-to-js'
import type { Request, Response } from 'express'
import Settings from 'models/settings.model'
import { ISettings } from 'types/settings'

export function defaultSettings() {
  return {
    club_id: '',
    dense: false,
    memberButtonPresetOne: '+6m',
    memberButtonPresetTwo: '+12m',
    memberButtonLabelOne: '6M',
    memberButtonLabelTwo: '12M',
  }
}

export const getSettings = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }

  Settings.find({
    club_id: club_id
  }, async (err, allSettings) => {
    if (err) {
      return res.status(500).send({err})
    }

    if (allSettings.length > 1) {
      return res.status(500).send({error: 'too many settings'})
    }

    let settings = allSettings[0]
    return res.status(200).json({settings})
  })
}

export const setSettings = async (req: Request, res: Response) => {
  let { club_id, 
        dense, 
        memberButtonPresetOne, 
        memberButtonPresetTwo,
        memberButtonLabelOne,
        memberButtonLabelTwo  } = req.body
  const [err, settings] = await to(Settings.findOneAndUpdate({ club_id: club_id },
    { 
      dense: dense,
      memberButtonPresetOne: memberButtonPresetOne,
      memberButtonPresetTwo: memberButtonPresetTwo,
      memberButtonLabelOne: memberButtonLabelOne,
      memberButtonLabelTwo: memberButtonLabelTwo,
    }, { new: true }).exec())
  
  if (err) return res.status(500).send({err})
  if (!settings) return res.status(500).json({error: 'invalid club id'})
  return res.status(200).json({settings})
}