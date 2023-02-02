const VotesService = require('../services/votes.service')
const CustomError = require('../utils/custom-error')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const votesService = new VotesService()

const getVotes = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query
    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset
    const { id } = request.params
    const profileId = request.user.profileId
    const userId = request.user.id
    if (id == userId) {
      let votes = await votesService.findAndCount(query, profileId)
      const results = getPagingData(votes, page, limit)
      return response.json({ results: results })
    } else{
      throw new CustomError('User not authorized', 401, 'Unauthorized')
    }
  } catch (error) {
    next(error)
  }
}

const addVote = async (request, response, next) => {
  try {
    let profile_id = request.user.profileId
    let publication_id = request.params.id

    let vote = await votesService.createVote({ publication_id, profile_id })
    console.log(vote)
    if (vote == 1) {
      return response.status(200).json({
        results: 'Voto Eliminado'
      })
    } else {
      return response.status(201).json({
        results: {
          profile_id: vote.profile_id,
          publication_id: vote.publication_id,
          updated_at: vote.updated_at,
          created_at: vote.created_at
        }
      })
    }
  } catch (error) {
    next(error)
  }
}

const getVote = async (request, response, next) => {
  try {
    let profileId = request.user.profileId
    let votes = await votesService.findAndCount(profileId)
    return response.json({ results: votes })
  } catch (error) {
    next(error)
  }
}

// const updateVote = async (request, response, next) => {
//   try {
//     let { id } = request.params
//     let { publication_id } = request.body
//     let vote = await votesService.updateVote(id, { publication_id })
//     return response.json({ results: vote })
//   } catch (error) {
//     next(error)
//   }
// }

const removeVote = async (request, response, next) => {
  try {
    let { id } = request.params
    let vote = await votesService.removeVote(id)
    return response.json({ results: vote, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getVotes,
  addVote,
  getVote,
  removeVote
}