import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertTriangle, FileText, X } from "lucide-react";
import { Button } from "../ui/button";
import emmanuelImage from 'figma:asset/a09a2b1998f86affe2ba913aa6d591b92493d83b.png';

interface NotificationItem {
  id: string;
  type: 'payment' | 'mention' | 'critical' | 'reminder';
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
}

export function NotificationPanel({ isOpen, onClose, onClearAll }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'payment',
      title: '€ 500 (June Payment) received from Tripids',
      content: '',
      timestamp: '5 min ago',
      isRead: false
    },
    {
      id: '2',
      type: 'mention',
      title: 'Emmanuel tagged you in "Investigating Support ticket spike detected- Bunqqi"',
      content: '',
      timestamp: '1 day ago',
      isRead: false,
      avatar: emmanuelImage
    },
    {
      id: '3',
      type: 'critical',
      title: 'Critical: Product Churn (-34%)',
      content: 'Tripids',
      timestamp: '2 days ago',
      isRead: false
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Reminder: ENIES\'s Quarterly business review prep (meeting Wednesday, 25th July, 2025)',
      content: 'Personal note',
      timestamp: '1 week ago',
      isRead: true
    }
  ]);

  const handleClearAll = () => {
    setNotifications([]);
    onClearAll();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return (
          <div className="w-12 h-12 rounded-full bg-[#E7F7EF] flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-[#0FAF62]" />
          </div>
        );
      case 'critical':
        return (
          <div className="w-12 h-12 rounded-full bg-[#FDEDED] flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#E84646]" />
          </div>
        );
      case 'reminder':
        return (
          <div className="w-12 h-12 rounded-full bg-[#F0F6FF] flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#005CE8]" />
          </div>
        );
      case 'mention':
      default:
        return (
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={emmanuelImage} 
              alt="Emmanuel" 
              className="w-full h-full object-cover"
            />
          </div>
        );
    }
  };

  const getContentColor = (type: string) => {
    if (type === 'critical') {
      return 'text-[#FF272D]';
    }
    return 'text-[#191B1C]';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          
          {/* Notification Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed right-4 md:right-6 lg:right-10 top-16 z-50 w-[372px] h-[408px] bg-white border border-[#E5E7E8] rounded-lg shadow-[0px_12px_40px_rgba(25,27,28,0.16)]"
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 0px 24px',
              gap: '24px'
            }}
          >
            {/* Header */}
            <div className="w-full h-[52px] bg-white flex items-center justify-between px-6 border-b border-[#E5E7E8]">
              <h3 className="text-sm font-medium text-[#191B1C]">Notification</h3>
              <button 
                onClick={handleClearAll}
                className="text-sm text-[#4A5154] hover:text-[#191B1C] transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Notifications List */}
            <div className="flex-1 w-full px-3 overflow-y-auto">
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                      <CheckCircle className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm text-[#7B878C]">No notifications</p>
                    <p className="text-xs text-[#7B878C] mt-1">You're all caught up!</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                    >
                      {/* Icon/Avatar */}
                      {getNotificationIcon(notification.type)}
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-5 ${getContentColor(notification.type)} break-words`}>
                          {notification.title}
                        </p>
                        {notification.content && (
                          <p className="text-sm text-[#191B1C] mt-1">
                            {notification.content}
                          </p>
                        )}
                        <p className="text-sm text-[#7B878C] mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}