'use client';

import { useState } from 'react';
import axios from 'axios';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    price: string;
    image: string;
    description: string;
  };
}

const PaymentModal = ({ isOpen, onClose, course }: PaymentModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: formData.firstName ? '' : 'First name is required',
      lastName: formData.lastName ? '' : 'Last name is required',
      email: formData.email ? (
        /^\S+@\S+\.\S+$/.test(formData.email) ? '' : 'Invalid email format'
      ) : 'Email is required',
      phone: formData.phone ? '' : 'Phone number is required'
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Numeric price without currency symbol
      const numericPrice = course.price.replace(/[^\d.]/g, '');
      
      const response = await axios.post('/api/create-payment', {
        courseId: course.id,
        courseTitle: course.title,
        price: numericPrice,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      });

      if (response.data.success) {
        // Option 1: Redirect to Paymob iframe
        window.location.href = response.data.iframeUrl;
        
        // Option 2: Open in new tab
        // window.open(response.data.iframeUrl, '_blank');
      } else {
        console.error('Payment initialization failed');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#262630] text-white border-gray-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Your Enrollment</DialogTitle>
          <DialogDescription className="text-gray-400">
            You are about to enroll in <span className="text-white">{"AI COURSE"}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-start space-x-4 mb-4">
          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
            <img 
              src={"/course-1.jpg"} 
              alt={"ASDASD"} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{"course.title"}</p>
            <p className="text-sm text-gray-400 line-clamp-2 mb-1">{"s"}</p>
            <p className="text-[#7878fc] font-bold">{"course.price"}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="john.doe@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="+20 123 456 7890"
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between gap-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Proceed to Payment'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;