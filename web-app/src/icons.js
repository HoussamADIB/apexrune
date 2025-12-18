// Lucide icon helper functions
import { 
  Code2, 
  Plug, 
  Activity, 
  Zap,
  Rocket,
  Shield,
  Users,
  Target,
  Clock,
  CheckCircle2,
  TrendingUp,
  Link2,
  RefreshCw,
  BarChart3,
  Gauge,
  Stethoscope,
  Workflow,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  ChevronLeft,
  Star,
  TrendingUp as TrendingUpIcon,
  Database,
  FileText,
  AlertCircle,
  UserX,
  Check,
  ArrowRight,
  Mail,
  Calendar,
  Linkedin,
  Sparkles
} from 'lucide';

// Helper function to create SVG string from Lucide icon
export function createIconSVG(iconData, size = 32, color = 'currentColor', strokeWidth = 2) {
  if (!iconData) return '';
  
  // Lucide icons are arrays of path elements: [['path', {d: '...'}], ['path', {d: '...'}]]
  try {
    if (!Array.isArray(iconData)) {
      return '';
    }
    
    // Build SVG string
    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">`;
    
    // Process each path element
    iconData.forEach(element => {
      if (Array.isArray(element) && element.length >= 2) {
        const [tag, attrs = {}] = element;
        const attrsString = Object.entries(attrs)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ');
        svg += `<${tag} ${attrsString}></${tag}>`;
      }
    });
    
    svg += '</svg>';
    return svg;
  } catch (e) {
    console.error('Error creating icon SVG:', e);
    return '';
  }
}

// Service icons mapping - using more relevant icons
export function getServiceIcon(serviceKey, size = 64, color = 'white') {
  const iconMap = {
    'custom-development': Code2, // Code icon for custom development
    'system-integration': Plug, // Plug icon for integrations
    'health-checks': Stethoscope, // Stethoscope for health checks
    'process-automation': Workflow, // Workflow icon for automation
    'salesforce-quick-start': Rocket // Rocket for quick start
  };
  
  const iconData = iconMap[serviceKey];
  if (!iconData) return '';
  
  return createIconSVG(iconData, size, color, 2);
}

// Service card icons (smaller, colored versions)
export function getServiceCardIcon(serviceKey, size = 32) {
  const colorMap = {
    'custom-development': '#3B82F6',
    'system-integration': '#8B5CF6',
    'health-checks': '#10B981',
    'process-automation': '#F59E0B',
    'salesforce-quick-start': '#10B981'
  };
  
  const iconMap = {
    'custom-development': Code2,
    'system-integration': Plug,
    'health-checks': Stethoscope,
    'process-automation': Workflow,
    'salesforce-quick-start': Rocket
  };
  
  const iconData = iconMap[serviceKey];
  const color = colorMap[serviceKey] || '#3B82F6';
  
  if (!iconData) return '';
  
  return createIconSVG(iconData, size, color, 2);
}

// Result icons mapping
export function getResultIcon(iconType, size = 48, color = 'currentColor') {
  const iconMap = {
    'lightning': Zap,
    'users': Users,
    'target': Target,
    'rocket': Rocket,
    'shield': Shield,
    'clock': Clock,
    'accuracy': CheckCircle2,
    'scale': TrendingUp,
    'link': Link2,
    'sync': RefreshCw,
    'chart': BarChart3,
    'speed': Gauge,
    'check': CheckCircle2
  };
  
  const iconData = iconMap[iconType];
  if (!iconData) return '';
  
  return createIconSVG(iconData, size, color, 2);
}

// Common UI icons helper
export function getCommonIcon(iconName, size = 24, color = 'currentColor', strokeWidth = 2) {
  const iconMap = {
    'menu': Menu,
    'x': X,
    'close': X,
    'chevron-right': ChevronRight,
    'chevron-left': ChevronLeft,
    'chevron-down': ChevronDown,
    'arrow-right': ArrowRight,
    'check': Check,
    'check-circle': CheckCircle2,
    'star': Star,
    'mail': Mail,
    'calendar': Calendar,
    'linkedin': Linkedin,
    'sparkles': Sparkles,
    'shield-check': Shield,
    'trending-up': TrendingUpIcon,
    'database': Database,
    'file-text': FileText,
    'alert-circle': AlertCircle,
    'user-x': UserX,
    'rocket': Rocket
  };
  
  const iconData = iconMap[iconName];
  if (!iconData) return '';
  
  return createIconSVG(iconData, size, color, strokeWidth);
}
