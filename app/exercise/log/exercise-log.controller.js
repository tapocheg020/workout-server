import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc 	 	 	Create new exerciseLog
// @route 		POST /api/exercises/:exerciseId
// @access 		Private
export const createNewExerciseLog = asyncHandler(async (req, res) => {
	const exerciseId = +req.params.id

	const exercise = await prisma.exercise.findUnique({
		where: {
			id: exerciseId
		}
	})

	let timesDefault = []

	try {
		for (let i = 0; i < exercise.times; i++) {
			timesDefault.push({
				weight: 0,
				repeat: 0
			})
		}
	} catch (error) {
		res.status(404)
		throw new Error('Exercise not found!!')
	}

	const exerciseLog = await prisma.exerciseLog.create({
		data: {
			user: {
				connect: {
					id: req.user.id
				}
			},
			exercise: {
				connect: {
					id: exerciseId
				}
			},
			times: {
				createMany: {
					data: timesDefault
				}
			}
		},
		include: {
			times: true
		}
	})

	res.json(exerciseLog)
})
