import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Code, Smartphone, Globe, Users, Award, Zap, Star,X, Send, Mail, MessageSquare, User } from "lucide-react";

const Index = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const testimonials = [
    {
      name: "Nilaksha Anjana",
      company: "",
      role: "",
      content: "TriovateTech transformed our business with their innovative software solutions. Their team's expertise and dedication exceeded our expectations.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Marcus Johnson",
      company: "",
      role: "",
      content: "Working with TriovateTech was a game-changer. They delivered a scalable mobile app that increased our user engagement by 300%.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Nipun Yoshita",
      company: "",
      role: "Product Manager",
      content: "The quality of work and attention to detail from TriovateTech is outstanding. They truly understand modern technology trends.",
      rating: 5,
      avatar: ""
    },
    {
      name: "Robert Lopez",
      company: "",
      role: "",
      content: "TriovateTech's team helped us migrate to the cloud seamlessly. Their expertise saved us months of development time.",
      rating: 5,
      avatar: ""
    },
    {
      name: "Shehani Madalagama",
      company: "",
      role: "Project Manager",
      content: "From concept to deployment, TriovateTech delivered exceptional results. Our new platform has revolutionized our operations.",
      rating: 5,
      avatar: ""
    }
  ];
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Method 1: EmailJS (Recommended for frontend-only solution)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_d5ugero', // Your EmailJS service ID
          template_id: 'template_keeyw9i', // Your EmailJS template ID
          user_id: 'StXsMHTm7pk4bOBFp', // Your EmailJS public key
          template_params: {
            from_name: contactForm.name,
            from_email: contactForm.email,
            to_email: 'triovatetech@gmail.com', // Your receiving email
            subject: contactForm.subject,
            message: contactForm.message,
          }
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setContactForm({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setIsContactOpen(false);
          setSubmitStatus('');
        }, 2000);
      } else {
        throw new Error('Failed to send email');
      }

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const openContact = () => {
    setIsContactOpen(true);
    setSubmitStatus('');
  };

  const closeContact = () => {
    setIsContactOpen(false);
    setContactForm({ name: '', email: '', subject: '', message: '' });
    setSubmitStatus('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TriovateTech
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <Button 
                onClick={openContact}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contact Popup Overlay */}
      {isContactOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <button
                onClick={closeContact}
                className="absolute right-4 top-4 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Get In Touch</h2>
                <p className="text-blue-100">We'd love to hear from you. Send us a message!</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 text-center">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-center">
                  ❌ Failed to send message. Please check your EmailJS configuration and try again.
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative py-20 lg:py-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                Innovation Driven Solutions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Digital Future
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We deliver cutting-edge software solutions that drive innovation, enhance productivity, and accelerate your business growth in the digital landscape.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
                  View Our Work
                </Button>
              </div> */}
            </div>
            <div className="relative">
              <div >
                <img 
                  src="/images/Cover.png" 
                  alt="Code development" 
                  className="rounded-lg w-full h-61 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Tech Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From custom software development to digital transformation, we provide 
              end-to-end solutions tailored to your business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Custom Software Development</CardTitle>
                <CardDescription>
                  Tailored software solutions built with cutting-edge technologies to meet your unique business requirements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Mobile App Development</CardTitle>
                <CardDescription>
                  Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Web Development</CardTitle>
                <CardDescription>
                  Modern, responsive websites and web applications that drive engagement and deliver results.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Digital Transformation</CardTitle>
                <CardDescription>
                  Strategic guidance and implementation to modernize your business processes and technology infrastructure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Quality Assurance</CardTitle>
                <CardDescription>
                  Comprehensive testing and quality assurance services to ensure your software performs flawlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Cloud Solutions</CardTitle>
                <CardDescription>
                  Scalable cloud infrastructure and migration services to optimize performance and reduce costs.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                About TriovateTech
              </Badge>
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Pioneering Innovation Since Day One
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At TriovateTech, we combine technical expertise with creative vision to deliver 
                software solutions that transform businesses. Our team of skilled developers, 
                designers, and strategists work collaboratively to bring your ideas to life.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                  <div className="text-gray-600">Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
              {/* <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Learn More About Us
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
              Client Testimonials
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients 
              have to say about their experience working with TriovateTech.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage 
                              src={testimonial.avatar} 
                              alt={testimonial.name}
                            />
                            <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                            <CardDescription className="text-sm text-gray-600">
                              {testimonial.role} {testimonial.company}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-700 leading-relaxed italic">
                          "{testimonial.content}"
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Directors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              Leadership Team
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Directors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team drives innovation and guides TriovateTech 
              towards achieving excellence in every project we undertake.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src="/images/Kavindu.jpeg" 
                      alt="Kavindu"
                      className="object-cover w-full h-full rounded-full"
                    />
                    <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      SJ
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl mb-2">Kavindu Mihiran</CardTitle>
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                  Chief Executive Officer
                </Badge>
                <CardDescription className="text-gray-600 leading-relaxed">
                  With over 5 years of experience in tech leadership, Kavindu drives our strategic 
                  vision and ensures we deliver exceptional value to our clients while fostering 
                  innovation across all departments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src="/images/Keshan.jpeg" 
                      alt="Keshan"
                      className="object-cover w-full h-full rounded-full"
                    />
                    <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                      MC
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl mb-2">Keshan Wishvajith</CardTitle>
                <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
                  Chief Technology Officer
                </Badge>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Keshan leads our technical strategy and architecture decisions. His expertise 
                  in emerging technologies and scalable solutions ensures we stay at the 
                  forefront of software innovation.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage 
                      src="/images/Tharusha.jpeg" 
                      alt="Tharusha"
                      className="object-cover w-full h-full rounded-full"
                    />
                    <AvatarFallback className="text-xl font-semibold bg-gradient-to-br from-green-500 to-teal-600 text-white">
                      DR
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl mb-2">Tharusha Senal</CardTitle>
                <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                  Chief Financial Officer
                </Badge>
                <CardDescription className="text-gray-600 leading-relaxed">
                  Tharusha manages our financial strategy and operations with precision. His analytical 
                  approach and business acumen help optimize our resources while maintaining 
                  sustainable growth and profitability.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Let's discuss how we can help you achieve your digital goals with innovative 
            software solutions tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={openContact} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                TriovateTech
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming businesses through innovative software solutions and cutting-edge technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Custom Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cloud Solutions</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>triovatetech@gmail.com</p>
                <p>+94719981665</p>
                <p>Hettiyawaththa Kade<br />Pathakada , Pelmadulla</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TriovateTech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
