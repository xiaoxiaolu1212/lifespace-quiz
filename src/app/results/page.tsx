'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuiz } from '@/context/QuizContext'
import { findBestMatches } from '@/lib/matching'
import KeyServices from '@/app/components/KeyServices'
import AltOptions from '@/app/components/AltOptions'
import PreferenceCard from '@/app/components/PreferenceCard'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function Results() {
  const { answers } = useQuiz()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    contactMethod: ''
  })

  // Get the best matches based on quiz answers
  const matches = findBestMatches(answers)
  const bestMatch = matches[0]
  const altOptions = matches.slice(1, 3)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleContactMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      contactMethod: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  // Handle PDF download
  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('results-content')
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const communityName = bestMatch?.name || 'Community'
      pdf.save(`${communityName}-Results.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  // Helper function to generate "Why this community fits you" items
  const getWhyThisCommunityFits = () => {
    const reasons = []
    
    // 1. Location preference - "close to where you want to live"
    if (answers.locationPreference?.selected && answers.locationPreference.selected !== '') {
      let locationText = ''
      
      if (answers.locationPreference.selected === 'family') {
        locationText = 'Close to family and friends'
      } else if (answers.locationPreference.selected === 'specific-location') {
        locationText = `Close to ${answers.locationPreference.specificLocation || 'your preferred location'}`
      } else if (answers.locationPreference.selected === 'travel') {
        locationText = 'Convenient location for travel'
      } else if (answers.locationPreference.selected === 'nature') {
        locationText = 'Close to natural surroundings'
      } else if (answers.locationPreference.selected === 'city') {
        locationText = 'Close to vibrant city lifestyle'
      } else if (answers.locationPreference.selected === 'open') {
        locationText = 'Flexible location options'
      }
      
      if (locationText) {
        reasons.push({
          icon: (
            <img 
              src="/images/results-whyfit-location.svg" 
              alt="Location" 
              style={{ width: '32px', height: '32px' }}
            />
          ),
          text: locationText,
          color: 'bg-[#C1C5DD]'
        })
      }
    }
    
    // 2. Special care needs
    if (answers.careNeeds?.hasCareNeeds === 'yes' && answers.careNeeds?.careDetails) {
      reasons.push({
        icon: (
          <img 
            src="/images/results-whyfit-speializedcare.svg" 
            alt="Specialized Care" 
            style={{ width: '32px', height: '32px' }}
          />
        ),
        text: `Specialized care for: ${answers.careNeeds.careDetails}`,
        color: 'bg-[#C1C5DD]'
      })
    }
    
    // 3. Care Level (if user selected any of the first 3 options)
    if (answers.careLevel && ['independent', 'assisted', 'skilled'].includes(answers.careLevel)) {
      let careLevelText = ''
      if (answers.careLevel === 'independent') {
        careLevelText = 'Independent Living services and support'
      } else if (answers.careLevel === 'assisted') {
        careLevelText = 'Assisted Living care and assistance'
      } else if (answers.careLevel === 'skilled') {
        careLevelText = 'Skilled Nursing and Rehabilitation services'
      }
      
      reasons.push({
        icon: (
          <img 
            src="/images/results-whyfit-careneeds.svg" 
            alt="Care Level" 
            style={{ width: '32px', height: '32px' }}
          />
        ),
        text: careLevelText,
        color: 'bg-[#C1C5DD]'
      })
    }
    
    // 4. Bedroom space
    if (answers.spaceSize && answers.spaceSize.length > 0) {
      const bedroomText = answers.spaceSize.map(size => 
        size === 'one-bedroom' ? '1 bedroom' : 
        size === 'two-bedroom' ? '2 bedroom' : 
        size === 'three-bedroom' ? '3 bedroom' : size
      ).join(' or ')
      
      reasons.push({
        icon: (
          <img 
            src="/images/results-whyfit-space.svg" 
            alt="Space" 
            style={{ width: '32px', height: '32px' }}
          />
        ),
        text: `Beautiful ${bedroomText} space available`,
        color: 'bg-[#C1C5DD]'
      })
    }
    
    // 5. Hobbies
    if (answers.hobbies && answers.hobbies.length > 0) {
      const hobbyText = answers.hobbies.join(', ')
      
      reasons.push({
        icon: (
          <img 
            src="/images/results-whyfit-hobbies.svg" 
            alt="Hobbies" 
            style={{ width: '32px', height: '32px' }}
          />
        ),
        text: `Activities for your interests: ${hobbyText}`,
        color: 'bg-[#C1C5DD]'
      })
    }
    
    // 6. Pet friendly (only if user selected Yes)
    if (answers.pets === 'yes') {
      reasons.push({
        icon: (
          <img 
            src="/images/results-whyfit-pet.svg" 
            alt="Pets" 
            style={{ width: '32px', height: '32px' }}
          />
        ),
        text: 'Pet-friendly community with pet amenities',
        color: 'bg-[#C1C5DD]'
      })
    }
    
    // Return up to 5 reasons
    return reasons.slice(0, 5)
  }

  // Helper function to get preferences data for PreferenceCard components
  const getPreferencesData = () => {
    const preferences = []
    
    // Zip Code icon
    const zipCodeIcon = (
      <Image
        src="/images/results-preferencecard-zipcode.svg"
        alt="Zip Code"
        width={32}
        height={32}
        className="w-8 h-8"
      />
    )
    
    // Location icon
    const locationIcon = (
      <Image
        src="/images/results-preferencecard-locationpreference.svg"
        alt="Location"
        width={32}
        height={32}
        className="w-8 h-8"
      />
    )
    
    // Home icon
    const homeIcon = (
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    )
    
    // Heart icon
    const heartIcon = (
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    )
    
    // 1. Zip Code
    preferences.push({
      icon: zipCodeIcon,
      label: 'Zip Code',
      value: answers.zipCode || '33101'
    })
    
    // 2. Space Size
    if (answers.spaceSize.length > 0) {
      const sizes = answers.spaceSize.map(size => 
        size === 'one-bedroom' ? '1 Bedroom' : 
        size === 'two-bedroom' ? '2 Bedroom' : 
        size === 'three-bedroom' ? '3 Bedroom' : 
        size === 'not-sure' ? 'Not sure yet' : size
      ).join(', ')
      preferences.push({
        icon: homeIcon,
        label: 'Space Size',
        value: sizes
      })
    } else {
      preferences.push({
        icon: homeIcon,
        label: 'Space Size',
        value: '2 Bedroom'
      })
    }
    
    // 3. Location Preference
    if (answers.locationPreference?.selected && answers.locationPreference.selected !== '') {
      let locationText = ''
      if (answers.locationPreference.selected === 'family') {
        locationText = 'Family & Friends'
      } else if (answers.locationPreference.selected === 'specific-location') {
        locationText = answers.locationPreference.specificLocation || 'A Specific City Or State Outside Where I Live'
      } else if (answers.locationPreference.selected === 'travel') {
        locationText = 'Convenient Location For Travel'
      } else if (answers.locationPreference.selected === 'nature') {
        locationText = 'Natural Surroundings'
      } else if (answers.locationPreference.selected === 'city') {
        locationText = 'Vibrant City Lifestyle'
      } else if (answers.locationPreference.selected === 'open') {
        locationText = "I'm Open To Different Options"
      }
      preferences.push({
        icon: locationIcon,
        label: 'Location Preference',
        value: locationText
      })
    } else {
      preferences.push({
        icon: locationIcon,
        label: 'Location Preference',
        value: "I'm Open To Different Options"
      })
    }
    
    // 4. Daily Pace
    const paceIcon = (
      <Image
        src="/images/results-preferencecard-daily.svg"
        alt="Daily Pace"
        width={32}
        height={32}
        className="w-8 h-8"
      />
    )
    
    if (answers.dailyPace) {
      let paceText = ''
      if (answers.dailyPace === 'relaxed') {
        paceText = 'Relaxed and quiet'
      } else if (answers.dailyPace === 'active') {
        paceText = 'Active and busy'
      } else if (answers.dailyPace === 'mixed') {
        paceText = 'Mix of everything'
      }
      preferences.push({
        icon: paceIcon,
        label: 'Daily Pace',
        value: paceText
      })
    } else {
      preferences.push({
        icon: paceIcon,
        label: 'Daily Pace',
        value: 'Mix of everything'
      })
    }
    
    // 5. Hobbies
    if (answers.hobbies.length > 0) {
      preferences.push({
        icon: heartIcon,
        label: 'Hobbies',
        value: answers.hobbies.join(', ')
      })
    } else {
      preferences.push({
        icon: heartIcon,
        label: 'Hobbies',
        value: 'Fitness, Arts'
      })
    }
    
    // 6. Care Level
    const careLevelIcon = (
      <Image
        src="/images/results-preferencecard-careneed.svg"
        alt="Care Level"
        width={32}
        height={32}
        className="w-8 h-8"
      />
    )
    
    if (answers.careLevel) {
      let careLevelText = ''
      if (answers.careLevel === 'independent') {
        careLevelText = 'Independent Living'
      } else if (answers.careLevel === 'assisted') {
        careLevelText = 'Assisted Living'
      } else if (answers.careLevel === 'skilled') {
        careLevelText = 'Skilled Nursing/Rehabilitation'
      } else if (answers.careLevel === 'notsure') {
        careLevelText = "I'm not sure yet"
      }
      preferences.push({
        icon: careLevelIcon,
        label: 'Care Level',
        value: careLevelText
      })
    } else {
      preferences.push({
        icon: careLevelIcon,
        label: 'Care Level',
        value: 'Independent Living'
      })
    }
    
    // 7. Pets
    const petIcon = (
      <Image
        src="/images/results-preferencecard-pet.svg"
        alt="Pets"
        width={32}
        height={32}
        className="w-8 h-8"
      />
    )
    
    if (answers.pets) {
      const petText = answers.pets === 'yes' ? 'Yes, I have pets' : 'No pets'
      preferences.push({
        icon: petIcon,
        label: 'Pets',
        value: petText
      })
    } else {
      preferences.push({
        icon: petIcon,
        label: 'Pets',
        value: 'Yes, I have pets'
      })
    }
    
    // 8. Health Considerations
    const healthIcon = (
      <Image
        src="/images/results-preferencecard-health.svg"
        alt="Health Considerations"
        width={32}
        height={32}
        className="w-8 h-8"
      />
    )
    
    if (answers.careNeeds.hasCareNeeds) {
      let healthText = ''
      if (answers.careNeeds.hasCareNeeds === 'yes') {
        if (answers.careNeeds.careDetails) {
          const healthDetails = answers.careNeeds.careDetails
          const truncatedDetails = healthDetails.length > 15 ? healthDetails.substring(0, 15) + '...' : healthDetails
          healthText = `Yes, I have health considerations: ${truncatedDetails}`
        } else {
          healthText = 'Yes, I have health considerations'
        }
      } else {
        healthText = 'No health considerations'
      }
      preferences.push({
        icon: healthIcon,
        label: 'Health Considerations',
        value: healthText
      })
    } else {
      preferences.push({
        icon: healthIcon,
        label: 'Health Considerations',
        value: 'No health considerations'
      })
    }
    
    return preferences
  }

  return (
    <div className="min-h-screen bg-off-white" id="results-content">
      {/* Header */}
      <header className="border-b border-gray-200" style={{ backgroundColor: '#D4C799' }}>
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-center relative">
            <div className="absolute left-0 text-black font-proxima-nova font-semibold">
              MENU
            </div>
            <Link href="/" className="text-center hover:opacity-80 transition-opacity p-2">
              <Image
                src="/images/find-community-logo.svg"
                alt="LifeSpace Communities"
                width={210}
                height={63}
                className="mx-auto object-contain"
              />
            </Link>
            <button className="absolute right-0 text-white px-6 py-2 font-proxima-nova hover:bg-opacity-90 transition-all duration-200" style={{ backgroundColor: '#121C21', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.06em' }}>
              REQUEST A CALL
            </button>
          </div>
        </div>
      </header>

      {/* Perfect Match Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/quiz/question-8"
              className="inline-flex items-center space-x-2 text-black font-proxima-nova font-semibold hover:text-accent-green transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>BACK</span>
            </Link>
          </div>

          {/* Header Text */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-proxima-nova font-medium text-black mb-4" style={{ fontSize: '41px' }}>
                  We&apos;ve found your perfect community match!
                </h2>
                <p className="text-lg font-proxima-nova text-gray-600">
                  Based on your answers, here&apos;s a community that fits your lifestyle and needs.
                </p>
              </div>
              <div>
                {/* Empty column to match the layout below */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Community Image */}
            <div className="flex">
              <div className="w-full">
                {bestMatch?.name === 'Beacon Hill' ? (
                  <Image
                    src="/images/results-beaconhill.jpg"
                    alt="Beacon Hill Community"
                    width={600}
                    height={480}
                    className="w-full h-full object-cover rounded-sm"
                  />
                ) : bestMatch?.name === 'Oak Trace' ? (
                  <Image
                    src="/images/results-oaktrace.jpg"
                    alt="Oak Trace Community"
                    width={600}
                    height={480}
                    className="w-full h-full object-cover rounded-sm"
                  />
                ) : bestMatch?.name === "Harbour's Edge" ? (
                  <Image
                    src="/images/results-harboursedge.jpg"
                    alt="Harbour's Edge Community"
                    width={600}
                    height={480}
                    className="w-full h-full object-cover rounded-sm"
                  />
                ) : bestMatch?.name === 'Village on the Green' ? (
                  <Image
                    src="/images/results-villageonthegreen.jpg"
                    alt="Village on the Green Community"
                    width={600}
                    height={480}
                    className="w-full h-full object-cover rounded-sm"
                  />
                ) : bestMatch?.name === 'The Waterford' ? (
                  <Image
                    src="/images/results-thewaterford.jpg"
                    alt="The Waterford Community"
                    width={600}
                    height={480}
                    className="w-full h-full object-cover rounded-sm"
                  />
                ) : bestMatch?.name === 'Abbey Delray South' ? (
                  <Image
                    src="/images/results-abbeydelraysouth.jpg"
                    alt="Abbey Delray South Community"
                    width={600}
                    height={480}
                    className="w-full h-full object-cover rounded-sm"
                  />
                ) : (
                  <div className="bg-gray-300 flex items-center justify-center h-full">
                    <span className="text-gray-500 font-proxima-nova">Community Pool & Landscape Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Community Details */}
            <div className="flex flex-col justify-center">
              <h3 className="font-proxima-nova text-black mb-6" style={{ fontSize: '40px', fontWeight: '600', letterSpacing: '0.1em' }}>
                {bestMatch?.name || 'Community Match'}
              </h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-proxima-nova text-gray-700" style={{ fontSize: '20px', fontWeight: '500', letterSpacing: '0.1em' }}>{bestMatch?.address || 'Address not available'}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-accent-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-proxima-nova text-gray-700" style={{ fontSize: '20px', fontWeight: '500', letterSpacing: '0.1em' }}>{bestMatch?.phoneNumber || 'Phone not available'}</span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-proxima-nova font-semibold text-black mb-6" style={{ fontSize: '18px' }}>Why this community fits you:</h4>
                <div className="space-y-4">
                  {getWhyThisCommunityFits().map((reason, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-primary-yellow bg-opacity-20 rounded-sm">
                      <div className="flex items-center justify-center flex-shrink-0">
                        {reason.icon}
                      </div>
                      <span className="font-proxima-nova text-gray-700">{reason.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <a href="#contact-form" className="w-full text-white px-8 py-3 font-proxima-nova hover:bg-opacity-90 transition-all duration-200 inline-block text-center" style={{ backgroundColor: '#121C21', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.06em' }}>
                  REQUEST A CALL
                </a>
                <button className="w-full bg-white text-gray-700 px-8 py-3 font-proxima-nova hover:bg-gray-50 transition-all duration-200 border" style={{ borderRadius: '8px', borderWidth: '1px', borderColor: '#D1D5DB', fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.06em' }}>
                  LEARN MORE ABOUT {bestMatch?.name?.toUpperCase() || 'THIS COMMUNITY'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-proxima-nova text-black mb-4" style={{ fontSize: '41px', fontWeight: '600', letterSpacing: '0.1em' }}>
              LIFESTYLE
            </h2>
            <p className="text-lg font-proxima-nova text-gray-600">
              Activities & Amenities You&apos;ll Enjoy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dining Section */}
            <div className="text-center">
              <div className="mb-6 overflow-hidden rounded-sm" style={{ width: '383px', height: '500px' }}>
                <Image
                  src="/images/results-dinning.png"
                  alt="Dining"
                  width={383}
                  height={500}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <h3 className="text-xl font-proxima-nova text-black mb-3" style={{ fontWeight: '500' }}>DINING</h3>
              <p className="font-proxima-nova text-gray-600">
                Daily menus, chef-prepared meals, options tailored to diet / taste
              </p>
            </div>

            {/* Fitness Center Section */}
            <div className="text-center">
              <div className="mb-6 overflow-hidden rounded-sm" style={{ width: '383px', height: '500px' }}>
                <Image
                  src="/images/results-fitness.jpg"
                  alt="Fitness Center"
                  width={383}
                  height={500}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <h3 className="text-xl font-proxima-nova text-black mb-3" style={{ fontWeight: '500' }}>FITNESS CENTER</h3>
              <p className="font-proxima-nova text-gray-600">
                Many classes for different fitness levels
              </p>
            </div>

            {/* Library Section */}
            <div className="text-center">
              <div className="mb-6 overflow-hidden rounded-sm" style={{ width: '383px', height: '500px' }}>
                <Image
                  src="/images/results-library.jpg"
                  alt="Library"
                  width={383}
                  height={500}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              <h3 className="text-xl font-proxima-nova text-black mb-3" style={{ fontWeight: '500' }}>LIBRARY</h3>
              <p className="font-proxima-nova text-gray-600">
                A quiet space to read, learn, and enjoy your favorite books.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services Component */}
      <div style={{ marginBottom: '80px' }}>
        <KeyServices />
      </div>

      {/* Let's Connect Section */}
      <section id="contact-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-proxima-nova font-bold text-black mb-4">
              LET&apos;S CONNECT YOU WITH {bestMatch?.name?.toUpperCase() || 'YOUR MATCHED COMMUNITY'}
            </h2>
            <p className="text-lg font-proxima-nova text-gray-600">
              Our community specialists are ready to help you learn more and schedule a personalized tour.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#B5B5B5] shadow-lg mx-auto rounded-sm" style={{ width: '650px', height: '600px' }}>
            <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block font-proxima-nova font-semibold text-black mb-2">
                    Full Name *
                  </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-200 bg-gray-50 font-proxima-nova focus:outline-none focus:border-accent-green focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-proxima-nova font-semibold text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-200 bg-gray-50 font-proxima-nova focus:outline-none focus:border-accent-green focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block font-proxima-nova font-semibold text-black mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-200 bg-gray-50 font-proxima-nova focus:outline-none focus:border-accent-green focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-proxima-nova font-semibold text-black mb-3">
                  Preferred Contact Method
                </label>
                <div className="space-y-2">
                  {['email', 'phone', 'text'].map((method) => (
                    <label key={method} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={formData.contactMethod === method}
                        onChange={handleContactMethodChange}
                        className="text-accent-green focus:ring-accent-green"
                      />
                      <span className="font-proxima-nova text-gray-700 capitalize">
                        {method === 'text' ? 'Text Message' : method === 'phone' ? 'Phone Call' : 'Email'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              </div>

              <div style={{ paddingTop: '24px', paddingBottom: '24px' }}>
                <button
                  type="submit"
                  className="w-full text-white py-3 font-proxima-nova hover:bg-opacity-90 transition-all duration-200"
                  style={{ backgroundColor: '#121C21', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.06em' }}
                >
                  SUBMIT
                </button>

                <p className="text-sm font-proxima-nova text-gray-500 text-center" style={{ marginTop: '8px' }}>
                  By submitting this form, you agree to be contacted by our community specialists.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Alt Options Component */}
      <div>
        <AltOptions 
          options={[
            {
              name: 'The Waterford',
              location: 'Juno Beach, FL',
              description: 'Coastal living with fresh seafood',
              imageUrl: '/images/results-thewaterford.jpg',
              linkUrl: 'https://www.thewaterford.com/'
            },
            {
              name: 'Village on the Green',
              location: 'Longwood, FL',
              description: 'Excellent fitness and wellness programs',
              imageUrl: '/images/results-villageonthegreen.jpg',
              linkUrl: 'https://www.votgseniorliving.com/'
            },
            {
              name: 'Abbey Delray South',
              location: 'Delray Beach, FL',
              description: 'Luxury senior living in Palm Beach County',
              imageUrl: '/images/results-abbeydelraysouth.jpg',
              linkUrl: 'https://www.abbeydelraysouth.com/'
            },
            {
              name: 'Oak Trace',
              location: 'Downers Grove, IL',
              description: 'Brand new independent living residences',
              imageUrl: '/images/results-oaktrace.jpg',
              linkUrl: 'https://www.oaktraceseniorliving.com/'
            },
            {
              name: 'Beacon Hill',
              location: 'Lombard, IL',
              description: 'Active senior living community',
              imageUrl: '/images/results-beaconhill.jpg',
              linkUrl: 'https://www.beaconhilllombard.com/'
            },
            {
              name: "Harbour's Edge",
              location: 'Delray Beach, FL',
              description: 'Waterfront living with resort-style amenities',
              imageUrl: '/images/results-harboursedge.jpg',
              linkUrl: 'https://www.harboursedge.com/'
            }
          ]}
        />
      </div>

      {/* Your Preferences Section */}
      <section className="bg-white" style={{ paddingTop: '104px', paddingBottom: '64px' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-proxima-nova font-bold text-black mb-4">
              YOUR PREFERENCES AT A GLANCE
            </h2>
            <p className="text-lg font-proxima-nova text-gray-600">
              Here&apos;s a summary of your preferences that helped us find your perfect match.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mb-8 mx-auto" style={{ gap: '24px', width: '1174px' }}>
            {getPreferencesData().map((preference, index) => (
              <PreferenceCard
                key={index}
                icon={preference.icon}
                label={preference.label}
                value={preference.value}
              />
            ))}
          </div>

        <div className="text-center">
          <div className="text-accent-green font-proxima-nova">
            Want to update your preferences? <Link href="/quiz/question-1" className="underline hover:no-underline">Retake the quiz.</Link>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="flex justify-center my-8">
          <div style={{ width: '1167px', height: '1px', backgroundColor: '#B5B5B5' }}></div>
        </div>
      </section>

      {/* Result Page CTAs */}
      <section className="bg-white" style={{ paddingTop: '0px', paddingBottom: '64px' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center space-x-4">
              <button className="text-white px-8 py-3 font-proxima-nova hover:bg-opacity-90 transition-all duration-200" style={{ backgroundColor: '#121C21', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.06em' }}>
                SHARE
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="bg-white text-gray-700 px-8 py-3 font-proxima-nova hover:bg-gray-50 transition-all duration-200 border" 
                style={{ borderRadius: '8px', borderWidth: '1px', borderColor: '#D1D5DB', fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.06em' }}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Footer Section */}
      <footer className="bg-[#2C2C2C] text-[#D4C799]">
        {/* Top Section */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Left Column - About/Resources */}
              <div className="space-y-4 text-center md:text-left">
                <a href="#" className="block font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  ABOUT
                </a>
                <a href="#" className="block font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  MISSION
                </a>
                <a href="#" className="block font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  NEWS
                </a>
                <a href="#" className="block font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  RESOURCES
                </a>
              </div>

              {/* Middle Column - Get Support */}
              <div className="flex items-start justify-center">
                <a href="#" className="font-proxima-nova text-[#D4C799] hover:text-white transition-colors">
                  GET SUPPORT
                </a>
              </div>

              {/* Right Column - Follow Us */}
              <div className="text-center md:text-right">
                <h4 className="font-proxima-nova text-[#D4C799] mb-6">
                  FOLLOW US
                </h4>
                <div className="flex space-x-4 justify-center md:justify-end">
                  {/* Twitter/X Icon */}
                  <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  {/* Facebook Icon */}
                  <a href="#" className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-sm font-proxima-nova text-[#D4C799] text-center">
              © 2025 Lifespace Communities, Inc.® | All Rights Reserved | Privacy Policy | Federal Transparency in Coverage
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
