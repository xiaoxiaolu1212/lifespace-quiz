import { communities } from './communities'

// Define the quiz answer types
export interface QuizAnswers {
  zipCode: string
  spaceSize: string[]
  locationPreference: {
    selected: string
    specificLocation?: string
  }
  hobbies: string[]
  pets: string
  careNeeds: {
    hasCareNeeds: string
    careDetails?: string
  }
}

// Helper function to get a more varied selection
function getVariedSelection(communities: any[], answers: QuizAnswers) {
  // If no specific preferences, return a more random selection
  if (!answers.zipCode && !answers.locationPreference?.selected && 
      (!answers.hobbies || answers.hobbies.length === 0)) {
    const shuffled = [...communities].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  }
  
  // For more variety, sometimes promote lower-scored communities
  const topScore = communities[0]?.matchScore || 0
  const variedCommunities = communities.map((community, index) => {
    // Give a chance for lower-ranked communities to be promoted
    if (index > 0 && Math.random() < 0.3) {
      return {
        ...community,
        matchScore: (community.matchScore || 0) + Math.random() * 20
      }
    }
    return community
  })
  
  // Re-sort with the varied scores
  return variedCommunities
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 3)
}

// Find the top 3 best matching communities based on user answers
export function findBestMatches(answers: QuizAnswers) {
  // Safety check for answers object
  if (!answers) {
    return communities.slice(0, 3)
  }
  
  const scoredCommunities = communities.map(community => {
    let score = 0
    
    // Base score for all communities (ensures variety)
    score += Math.random() * 10
    
    // Zip code matching (exact match gets high score)
    if (answers.zipCode && community.zipCode && community.zipCode === answers.zipCode) {
      score += 40
    } else if (answers.zipCode && community.zipCode) {
      // Partial zip code matching (same state/region)
      const userZip = answers.zipCode.substring(0, 2)
      const communityZip = community.zipCode.substring(0, 2)
      if (userZip === communityZip) {
        score += 20
      }
    }
    
    // Location preference matching with more variety
    if (answers.locationPreference?.selected === 'coastal' && 
        community.address.toLowerCase().includes('beach')) {
      score += 25
    } else if (answers.locationPreference?.selected === 'urban' && 
               (community.address.toLowerCase().includes('city') || 
                community.name.toLowerCase().includes('village'))) {
      score += 25
    } else if (answers.locationPreference?.selected === 'suburban') {
      score += 20
    }
    
    // Space size matching with weighted scoring
    if (answers.spaceSize?.includes('one-bedroom') && 
        community.availableSizes?.includes('1br')) {
      score += 15
    }
    if (answers.spaceSize?.includes('two-bedroom') && 
        community.availableSizes?.includes('2br')) {
      score += 15
    }
    if (answers.spaceSize?.includes('three-bedroom') && 
        community.availableSizes?.includes('3br')) {
      score += 15
    }
    
    // Enhanced hobbies matching with better keyword matching
    const hobbyMatches = answers.hobbies?.filter(hobby => {
      const hobbyLower = hobby.toLowerCase()
      return community.hobbies?.some(communityHobby => {
        const communityHobbyLower = communityHobby.toLowerCase()
        // Direct match
        if (communityHobbyLower.includes(hobbyLower) || hobbyLower.includes(communityHobbyLower)) {
          return true
        }
        // Keyword matching for common hobby categories
        const hobbyKeywords = {
          'fitness': ['fitness', 'sports', 'wellness', 'aquatics', 'swimming'],
          'arts': ['art', 'creative', 'performing', 'fine arts', 'woodworking'],
          'nature': ['nature', 'outdoor', 'gardening', 'trails', 'volunteering'],
          'social': ['social', 'events', 'learning', 'lifelong']
        }
        
        for (const [category, keywords] of Object.entries(hobbyKeywords)) {
          if (hobbyLower.includes(category) && keywords.some(keyword => communityHobbyLower.includes(keyword))) {
            return true
          }
        }
        return false
      })
    }).length || 0
    
    score += hobbyMatches * 12
    
    // Pet-friendly matching
    if (answers.pets === 'yes' && community.petFriendly) {
      score += 15
    } else if (answers.pets === 'no') {
      // No penalty for non-pet-friendly if user doesn't have pets
      score += 5
    }
    
    // Care needs matching with more nuanced scoring
    if (answers.careNeeds?.hasCareNeeds === 'yes' && community.hasSpecialCare) {
      score += 20
    } else if (answers.careNeeds?.hasCareNeeds === 'no' && community.hasSpecialCare === false) {
      score += 15
    } else if (answers.careNeeds?.hasCareNeeds === 'no' && community.hasSpecialCare === true) {
      // Slight penalty for communities with special care when user doesn't need it
      score += 5
    }
    
    // Add some randomness to prevent always getting the same result
    score += Math.random() * 5
    
    return {
      ...community,
      matchScore: score
    }
  })
  
  // Sort by match score (highest first)
  const sortedCommunities = scoredCommunities
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
  
  // Apply variety selection
  return getVariedSelection(sortedCommunities, answers)
}
