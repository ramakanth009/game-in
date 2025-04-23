import React, { useState, useEffect } from 'react';
import { Button, Flex, Box, Text, Card, Avatar, Progress, Badge, VStack, HStack, Container, Center, Heading } from '@/components/ui/alert';

// Sample career path data for demonstration
const careerPaths = {
  fullstack: {
    name: "Full Stack Developer",
    emoji: "👨‍💻",
    tagline: "The versatile builder of digital world",
    color: "#6366f1",
    traits: {
      creative: 70,
      analytical: 80,
      social: 50,
      technical: 90
    }
  },
  datascience: {
    name: "Data Scientist",
    emoji: "📊",
    tagline: "Analytical mind uncovering insights",
    color: "#8b5cf6",
    traits: {
      creative: 50,
      analytical: 95,
      social: 60,
      technical: 85
    }
  },
  uxui: {
    name: "UX/UI Designer",
    emoji: "🎨",
    tagline: "Creative mind behind experiences",
    color: "#f59e0b",
    traits: {
      creative: 95,
      analytical: 60,
      social: 85,
      technical: 50
    }
  }
};

const TechCareerPathFinder = () => {
  // State to track which screen to show
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [activePath, setActivePath] = useState('fullstack');
  const [questionIndex, setQuestionIndex] = useState(0);
  
  // Cycle through screens to demonstrate app flow
  useEffect(() => {
    const screens = ['welcome', 'question', 'results'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % screens.length;
      setCurrentScreen(screens[currentIndex]);
      
      // Also cycle through career paths
      if (screens[currentIndex] === 'results') {
        const paths = Object.keys(careerPaths);
        const currentPathIndex = paths.indexOf(activePath);
        const nextPathIndex = (currentPathIndex + 1) % paths.length;
        setActivePath(paths[nextPathIndex]);
      }
      
      // Cycle through questions
      if (screens[currentIndex] === 'question') {
        setQuestionIndex((questionIndex + 1) % 10);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activePath, questionIndex]);
  
  const renderWelcomeScreen = () => (
    <Center className="h-full w-full p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <VStack spacing={8} className="text-center max-w-lg">
        <Heading as="h1" className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-transparent">
          Tech Career Path Finder
        </Heading>
        
        <Text className="text-gray-600">
          Discover your ideal tech career path by answering a series of questions.
          Swipe or tap to choose between options that match your preferences.
        </Text>
        
        <Button 
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-teal-400 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          Start Your Journey
        </Button>
        
        <VStack className="w-full mt-8">
          <Card className="w-full flex items-center p-4 shadow-md rounded-xl bg-white">
            <Box className="text-2xl mr-4">🔍</Box>
            <Text>Answer 10 questions about your preferences</Text>
          </Card>
          
          <Card className="w-full flex items-center p-4 shadow-md rounded-xl bg-white">
            <Box className="text-2xl mr-4">👥</Box>
            <Text>Discover your personality traits</Text>
          </Card>
          
          <Card className="w-full flex items-center p-4 shadow-md rounded-xl bg-white">
            <Box className="text-2xl mr-4">🚀</Box>
            <Text>Get your ideal tech career match</Text>
          </Card>
        </VStack>
      </VStack>
    </Center>
  );
  
  const renderQuestionScreen = () => (
    <Center className="h-full w-full p-6">
      <VStack spacing={6} className="w-full max-w-md">
        <Heading as="h1" className="text-2xl font-bold text-indigo-600">
          Tech Career Path Finder
        </Heading>
        
        <HStack className="w-full justify-between text-sm text-gray-600">
          <Text>Question {questionIndex + 1} of 10</Text>
          <Text>{(questionIndex + 1) * 10}% Complete</Text>
        </HStack>
        
        <Progress value={(questionIndex + 1) * 10} max={100} className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <Box className="h-full bg-gradient-to-r from-indigo-500 to-teal-400" style={{ width: `${(questionIndex + 1) * 10}%` }}></Box>
        </Progress>
        
        <HStack className="w-full justify-between">
          {Array.from({ length: 5 }).map((_, i) => (
            <Box 
              key={i}
              className={`w-3 h-3 rounded-full ${i <= questionIndex / 2 ? 'bg-teal-400' : 'bg-gray-200'}`}
            ></Box>
          ))}
        </HStack>
        
        <Card className="w-full p-6 shadow-lg rounded-2xl bg-white mt-4">
          <Heading as="h2" className="text-xl font-bold text-center mb-2">
            Do you prefer...
          </Heading>
          <Text className="text-gray-500 text-center text-sm mb-6">
            Choose what appeals to you more
          </Text>
          
          <VStack spacing={4} className="w-full">
            <Card className="w-full p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-500 transition-all cursor-pointer">
              <Center className="text-4xl mb-3">🛠️</Center>
              <Heading as="h3" className="text-lg font-semibold text-center mb-1">
                Building things
              </Heading>
              <Text className="text-gray-500 text-center text-sm">
                Creating solutions from scratch
              </Text>
            </Card>
            
            <Card className="w-full p-4 border-2 border-gray-100 rounded-xl hover:border-indigo-500 transition-all cursor-pointer">
              <Center className="text-4xl mb-3">📊</Center>
              <Heading as="h3" className="text-lg font-semibold text-center mb-1">
                Analyzing data
              </Heading>
              <Text className="text-gray-500 text-center text-sm">
                Finding patterns and insights
              </Text>
            </Card>
          </VStack>
          
          <Text className="text-gray-400 text-center text-xs mt-5">
            Swipe ↔ or tap option
          </Text>
        </Card>
        
        <HStack spacing={4} className="mt-4">
          <Button className="w-10 h-10 rounded-full bg-white border-2 border-pink-400 text-pink-400">
            ←
          </Button>
          <Button className="w-10 h-10 rounded-full bg-white border-2 border-teal-400 text-teal-400">
            →
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
  
  const renderResultsScreen = () => {
    const careerData = careerPaths[activePath];
    
    return (
      <Center className="h-full w-full p-6">
        <VStack spacing={4} className="w-full max-w-md">
          <Heading as="h1" className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-teal-400 bg-clip-text text-transparent">
            Your Ideal Tech Career
          </Heading>
          <Text className="text-gray-500">Based on your preferences</Text>
          
          <Card className="w-full p-6 shadow-lg rounded-2xl bg-white">
            <HStack className="border-b border-gray-100 pb-4 mb-4">
              <Center className="w-16 h-16 rounded-xl mr-4 text-3xl" style={{ backgroundColor: `${careerData.color}20` }}>
                {careerData.emoji}
              </Center>
              <VStack align="start" spacing={1}>
                <Heading as="h2" className="text-xl font-bold">
                  {careerData.name}
                </Heading>
                <Text className="text-gray-500 text-sm italic">
                  {careerData.tagline}
                </Text>
              </VStack>
            </HStack>
            
            <Center className="mb-4">
              <VStack>
                <Box className="relative w-20 h-20">
                  <Box 
                    className="absolute inset-0 rounded-full"
                    style={{ 
                      background: `conic-gradient(${careerData.color} 85%, #e9ecef 85%)`,
                      mask: 'radial-gradient(transparent 60%, black 60%)'
                    }}
                  ></Box>
                  <Center className="w-full h-full text-lg font-bold">
                    85%
                  </Center>
                </Box>
                <Text className="text-sm text-gray-500">Match Score</Text>
              </VStack>
            </Center>
            
            <Text className="text-gray-600 mb-6">
              You have a creative mindset with a strong focus on user needs. Your ability to think visually and empathize with users makes {careerData.name} the perfect career path for you!
            </Text>
            
            <HStack className="flex-wrap mb-6" justify="space-between">
              {Object.entries(careerData.traits).map(([trait, value]) => (
                <Box key={trait} className="w-1/2 p-2">
                  <Card className="p-3 text-center bg-gray-50 rounded-lg">
                    <Text className="text-xl font-bold" style={{ color: getTraitColor(trait) }}>
                      {value}%
                    </Text>
                    <Text className="text-xs text-gray-500 capitalize">
                      {trait}
                    </Text>
                  </Card>
                </Box>
              ))}
            </HStack>
            
            <VStack className="p-4 rounded-xl mb-4" style={{ backgroundColor: `${careerData.color}10` }}>
              <HStack className="w-full mb-2">
                <Box className="text-lg" style={{ color: careerData.color }}>
                  💻
                </Box>
                <Text className="font-semibold">Skills to Develop</Text>
              </HStack>
              
              <VStack align="start" className="w-full pl-8">
                {['User research and persona development', 'Wireframing and prototyping tools', 'Visual design principles'].map((skill, i) => (
                  <HStack key={i} align="start" spacing={2}>
                    <Box style={{ color: careerData.color }}>✓</Box>
                    <Text className="text-sm text-gray-600">{skill}</Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>
            
            <HStack className="mt-4 space-x-4">
              <Button className="flex-1 py-3 rounded-full bg-indigo-500 text-white">
                Try Again
              </Button>
              <Button className="flex-1 py-3 rounded-full bg-white border border-gray-200 text-gray-700">
                Share Result
              </Button>
            </HStack>
          </Card>
        </VStack>
      </Center>
    );
  };
  
  // Helper function to get color for trait
  const getTraitColor = (trait) => {
    const colors = {
      creative: '#f59e0b',
      analytical: '#8b5cf6',
      social: '#ec4899',
      technical: '#10b981'
    };
    
    return colors[trait] || '#6366f1';
  };
  
  return (
    <Box className="w-full h-screen relative overflow-hidden bg-gray-50">
      {/* Animated background with subtle patterns */}
      <Box className="absolute inset-0 opacity-20 pointer-events-none">
        <Box className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-teal-50"></Box>
        <Box className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(78, 205, 196, 0.1) 0%, transparent 30%)',
          backgroundSize: '30px 30px',
          backgroundPosition: '0 0, 15px 15px'
        }}></Box>
      </Box>
      
      {/* Sound toggle button */}
      <Box className="absolute top-4 right-4 z-10">
        <Button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-indigo-500">
          <Box className="transform transition-transform">🔊</Box>
        </Button>
      </Box>
      
      {/* Content based on current screen */}
      <Box className="relative z-1 w-full h-full">
        {currentScreen === 'welcome' && renderWelcomeScreen()}
        {currentScreen === 'question' && renderQuestionScreen()}
        {currentScreen === 'results' && renderResultsScreen()}
      </Box>
    </Box>
  );
};

export default TechCareerPathFinder;