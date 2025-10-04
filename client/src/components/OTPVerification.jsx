import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [userId, setUserId] = useState('');
  
  const navigate = useNavigate();
  const { setUser, setToken, backendUrl } = useContext(AppContext);

  useEffect(() => {
    // Get userId from localStorage (set during registration)
    const savedUserId = localStorage.getItem('tempUserId');
    if (!savedUserId) {
      navigate('/login');
      return;
    }
    setUserId(savedUserId);
    setCountdown(60); // Start 60-second countdown
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setMessage('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${backendUrl}/api/users/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          otp: otpString
        })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setToken(data.token);
        localStorage.removeItem('tempUserId');
        navigate('/');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${backendUrl}/api/users/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('New verification code sent to your email');
        setCountdown(60); 
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600">
            We've sent a 6-digit verification code to your email address. Please enter it below.
          </p>
        </div>

        <div className="space-y-6">
          
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              />
            ))}
          </div>

          
          {message && (
            <div className={`text-center p-3 rounded-lg ${
              message.includes('success') || message.includes('sent') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          
          <button
            onClick={handleVerify}
            disabled={loading || otp.join('').length !== 6}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          
          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-gray-500 text-sm">
                Resend code in {countdown} seconds
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-gray-400"
              >
                {resendLoading ? 'Sending...' : 'Resend Code'}
              </button>
            )}
          </div>

    
          <div className="text-center">
            <button
              onClick={() => {
                localStorage.removeItem('tempUserId');
                navigate('/');
              }}
              className="text-gray-500 hover:text-gray-700 text-sm"
            > 
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
