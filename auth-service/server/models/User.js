const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email est requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Format email invalide']
  },
  password: {
    type: String,
    required: [true, 'Mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères']
  },
  nom: {
    type: String,
    required: [true, 'Nom est requis'],
    trim: true,
    minlength: [2, 'Le nom doit contenir au moins 2 caractères']
  },
  prenom: {
    type: String,
    required: [true, 'Prénom est requis'],
    trim: true,
    minlength: [2, 'Le prénom doit contenir au moins 2 caractères']
  },
  role: {
    type: String,
    enum: ['APPRENANT', 'ADMIN', 'FORMATEUR'],
    default: 'APPRENANT',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

// Middleware pour hasher le mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  // Ne hasher que si le mot de passe a été modifié
  if (!this.isModified('password')) return next();
  
  try {
    // Hasher le mot de passe avec un salt de 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour obtenir les données publiques de l'utilisateur
userSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    email: this.email,
    nom: this.nom,
    prenom: this.prenom,
    role: this.role,
    isActive: this.isActive,
    createdAt: this.createdAt,
    lastLogin: this.lastLogin
  };
};

// Méthode statique pour les rôles disponibles
userSchema.statics.getRoles = function() {
  return ['APPRENANT', 'ADMIN', 'FORMATEUR'];
};

module.exports = mongoose.model('User', userSchema);