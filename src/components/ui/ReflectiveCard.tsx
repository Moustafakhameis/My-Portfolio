import { useState } from 'react';
import './ReflectiveCard.css';
import { Fingerprint, Activity, Lock, Check, MapPin, Phone, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface ReflectiveCardProps {
  blurStrength?: number;
  color?: string;
  metalness?: number;
  roughness?: number;
  overlayColor?: string;
  displacementStrength?: number;
  noiseScale?: number;
  specularConstant?: number;
  grayscale?: number;
  glassDistortion?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ReflectiveCard = ({
  blurStrength = 12,
  color = 'white',
  metalness = 1,
  roughness = 0.4,
  overlayColor = 'rgba(255, 255, 255, 0.1)',
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 1.2,
  grayscale = 1,
  glassDistortion = 0,
  className = '',
  style = {}
}: ReflectiveCardProps) => {
  const [copied, setCopied] = useState(false);
  const email = 'moustafakhameis@gmail.com';
  const phone = '+201129482206';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    '--blur-strength': `${blurStrength}px`,
    '--metalness': metalness,
    '--roughness': roughness,
    '--overlay-color': overlayColor,
    '--text-color': color,
    '--saturation': saturation
  } as React.CSSProperties;

  return (
    <div className={`reflective-card-container ${className}`} style={{ ...style, ...cssVariables }}>
      <svg className="reflective-svg-filters" aria-hidden="true">
        <defs>
          <filter id="metallic-displacement" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency={baseFrequency} numOctaves={2} result="noise" />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementStrength}
              xChannelSelector="R"
              yChannelSelector="G"
              result="rippled"
            />
            <feSpecularLighting
              in="noiseAlpha"
              surfaceScale={displacementStrength}
              specularConstant={specularConstant}
              specularExponent={20}
              lightingColor="#ffffff"
              result="light"
            >
              <fePointLight x={0} y={0} z={300} />
            </feSpecularLighting>
            <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
            <feBlend in="light-effect" in2="rippled" mode="screen" result="metallic-result" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="solidAlpha"
            />
            <feMorphology in="solidAlpha" operator="erode" radius={45} result="erodedAlpha" />
            <feGaussianBlur in="erodedAlpha" stdDeviation={10} result="blurredMap" />
            <feComponentTransfer in="blurredMap" result="glassMap">
              <feFuncA type="linear" slope={0.5} intercept={0} />
            </feComponentTransfer>
            <feDisplacementMap
              in="metallic-result"
              in2="glassMap"
              scale={glassDistortion}
              xChannelSelector="A"
              yChannelSelector="A"
              result="final"
            />
          </filter>
        </defs>
      </svg>

      <div className="reflective-gradient-bg" />

      <div className="reflective-noise" />
      <div className="reflective-sheen" />
      <div className="reflective-border" />

      <div className="reflective-content">
        <div className="card-header">
          <div className="security-badge">
            <Lock size={12} className="security-icon" />
            <span>SECURE ACCESS</span>
          </div>
          <div className="header-right">
            <div className="status-badge">
              <span className="status-dot" />
              <span>ONLINE</span>
            </div>
            <Activity className="status-icon" size={16} />
          </div>
        </div>

        <div className="card-body">
          {/* Avatar / Monogram */}
          <div className="avatar-ring">
            <div className="avatar-initials">ME</div>
          </div>

          <div className="user-info">
            <h2 className="user-name">MOSTAFA ALI EMAM</h2>
            <p className="user-role">FRONTEND ENGINEER</p>
            <div className="user-location">
              <MapPin size={12} />
              <span>Cairo, Egypt</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href="https://www.linkedin.com/in/moustafaly" target="_blank" rel="noopener noreferrer" className="social-link">
              <LinkedinIcon size={16} />
            </a>
            <a href="https://github.com/Moustafakhameis" target="_blank" rel="noopener noreferrer" className="social-link">
              <GithubIcon size={16} />
            </a>
          </div>
        </div>

        <div className="card-details">
          <div className="detail-row">
            <Mail size={13} className="detail-icon" />
            <span>{email}</span>
          </div>
          <div className="detail-row">
            <Phone size={13} className="detail-icon" />
            <span dir="ltr">{phone}</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="id-section">
            <span className="label">STATUS</span>
            <span className="value status-available">
              <span className="status-dot" />
              AVAILABLE FOR HIRE
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="fingerprint-section"
            title={copied ? 'Copied!' : 'Copy email'}
          >
            {copied ? (
              <Check size={28} className="fingerprint-icon copied" />
            ) : (
              <Fingerprint size={28} className="fingerprint-icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReflectiveCard;
