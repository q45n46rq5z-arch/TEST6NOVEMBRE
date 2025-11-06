// Base de données des normes, matières et critères de vérification
const verificationData = {
    normes: {
        "norme-1": {
            nom: "Norme 1 - Tuyaux Industriels",
            matieres: {
                "inox-304": {
                    nom: "Inox 304",
                    dimensions: {
                        "diam-25": {
                            nom: "Diamètre 25mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.1mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.05mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (absence de défauts)",
                                "Contrôler la composition chimique (C, Cr, Ni, Mo)",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (absence de corrosion)"
                            ]
                        },
                        "diam-50": {
                            nom: "Diamètre 50mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.15mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.08mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (absence de défauts)",
                                "Contrôler la composition chimique (C, Cr, Ni, Mo)",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (absence de corrosion)",
                                "Contrôler la circularité (déformation max 0.5%)"
                            ]
                        },
                        "diam-100": {
                            nom: "Diamètre 100mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.2mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.1mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (absence de défauts)",
                                "Contrôler la composition chimique (C, Cr, Ni, Mo)",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (absence de corrosion)",
                                "Contrôler la circularité (déformation max 0.5%)",
                                "Vérifier la rectitude (tolérance 1mm/m)"
                            ]
                        }
                    }
                },
                "inox-316": {
                    nom: "Inox 316",
                    dimensions: {
                        "diam-25": {
                            nom: "Diamètre 25mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.1mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.05mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (absence de défauts)",
                                "Contrôler la composition chimique (C, Cr, Ni, Mo)",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (absence de corrosion)",
                                "Vérifier la teneur en Molybdène (min 2.0%)"
                            ]
                        },
                        "diam-50": {
                            nom: "Diamètre 50mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.15mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.08mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (absence de défauts)",
                                "Contrôler la composition chimique (C, Cr, Ni, Mo)",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (absence de corrosion)",
                                "Vérifier la teneur en Molybdène (min 2.0%)",
                                "Contrôler la circularité (déformation max 0.5%)"
                            ]
                        }
                    }
                },
                "acier-carbone": {
                    nom: "Acier Carbone",
                    dimensions: {
                        "diam-25": {
                            nom: "Diamètre 25mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.1mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.05mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (absence de rouille)",
                                "Contrôler la composition chimique (C, Mn, Si, P, S)",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (protection contre corrosion)",
                                "Vérifier le traitement de surface (peinture/zinc)"
                            ]
                        },
                        "diam-50": {
                            nom: "Diamètre 50mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.15mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.08mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (absence de rouille)",
                                "Contrôler la composition chimique (C, Mn, Si, P, S)",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (protection contre corrosion)",
                                "Vérifier le traitement de surface (peinture/zinc)",
                                "Contrôler la circularité (déformation max 0.5%)"
                            ]
                        }
                    }
                }
            }
        },
        "norme-2": {
            nom: "Norme 2 - Tubes Haute Pression",
            matieres: {
                "inox-304": {
                    nom: "Inox 304",
                    dimensions: {
                        "diam-32": {
                            nom: "Diamètre 32mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 obligatoire)",
                                "Contrôler le diamètre extérieur (tolérance ±0.08mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.03mm)",
                                "Contrôler la longueur (tolérance ±2mm)",
                                "Vérifier l'état de surface (finition spécifique)",
                                "Contrôler la composition chimique complète",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2, A%)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité complète (numéro de lot)",
                                "Inspecter visuellement (absence de défauts)",
                                "Contrôler la circularité (déformation max 0.3%)",
                                "Vérifier les essais hydrostatiques (si applicable)",
                                "Contrôler la certification qualité fournisseur"
                            ]
                        },
                        "diam-63": {
                            nom: "Diamètre 63mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 obligatoire)",
                                "Contrôler le diamètre extérieur (tolérance ±0.12mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.05mm)",
                                "Contrôler la longueur (tolérance ±2mm)",
                                "Vérifier l'état de surface (finition spécifique)",
                                "Contrôler la composition chimique complète",
                                "Vérifier les propriétés mécaniques (Rm, Rp0.2, A%)",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité complète (numéro de lot)",
                                "Inspecter visuellement (absence de défauts)",
                                "Contrôler la circularité (déformation max 0.3%)",
                                "Vérifier les essais hydrostatiques (si applicable)",
                                "Contrôler la certification qualité fournisseur"
                            ]
                        }
                    }
                }
            }
        },
        "norme-3": {
            nom: "Norme 3 - Tubes Alimentaires",
            matieres: {
                "inox-304": {
                    nom: "Inox 304L",
                    dimensions: {
                        "diam-20": {
                            nom: "Diamètre 20mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.1mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.05mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (finition alimentaire)",
                                "Contrôler la composition chimique",
                                "Vérifier les propriétés mécaniques",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (absence de défauts)",
                                "Vérifier la conformité alimentaire (certificat)",
                                "Contrôler l'absence de contamination"
                            ]
                        },
                        "diam-40": {
                            nom: "Diamètre 40mm",
                            verifications: [
                                "Vérifier le certificat de matière (CM2.1 ou CM2.2)",
                                "Contrôler le diamètre extérieur (tolérance ±0.15mm)",
                                "Vérifier l'épaisseur de paroi (tolérance ±0.08mm)",
                                "Contrôler la longueur (tolérance selon spécification)",
                                "Vérifier l'état de surface (finition alimentaire)",
                                "Contrôler la composition chimique",
                                "Vérifier les propriétés mécaniques",
                                "Contrôler la conformité aux marquages",
                                "Vérifier la traçabilité (numéro de lot)",
                                "Inspecter visuellement (absence de défauts)",
                                "Vérifier la conformité alimentaire (certificat)",
                                "Contrôler l'absence de contamination"
                            ]
                        }
                    }
                }
            }
        },
        "rcc-cw": {
            nom: "RCC-CW",
            matieres: {
                "x2crnimo17-12-2": {
                    nom: "X2CrNiMo17-12-2 (1.4404)",
                    dimensions: {
                        "generique": {
                            nom: "Générique I362",
                            verifications: [
                                // Spécifications I362 — Matériau et identification
                                "Matériau: X2CrNiMo17-12-2 (1.4404) — austénitique",
                                "Famille: Aciers austénitiques résistant à la corrosion",
                                // Norme principale — NF EN 10088-2 (Déc. 2014)
                                "Certificat 3.1 EN 10204 présent et conforme",
                                "Analyse de coulée fournie",
                                "Résultats des essais mécaniques fournis",
                                // Composition chimique (Tableau 1)
                                "C ≤ 0,030 %",
                                "Si ≤ 1,00 %",
                                "Mn ≤ 2,00 %",
                                "P ≤ 0,045 %",
                                "S ≤ 0,015 %",
                                "Cr : 16,5 à 18,5 %",
                                "Mo : 2,00 à 2,50 %",
                                "Ni : 10,0 à 13,0 %",
                                "N ≤ 0,10 %",
                                // Caractéristiques mécaniques (Tableau 7)
                                "Rp0,2 conforme (220-260 MPa selon épaisseur)",
                                "Rm conforme (520-680 MPa)",
                                "Allongement A ≥ 40-45 %",
                                "Énergie de rupture KV2 : 100 J (long.) / 60 J (tr.)",
                                "Résistance à la corrosion intergranulaire: OUI (état livraison et sensibilisé)",
                                // Marquage requis (Tableau 22)
                                "Marquage: producteur, 1.4404, n° coulée, épaisseur nominale, identifiant",
                                // Exigences RCC-CW 2018 (CPLIN 5200)
                                "Certificat 3.1 validé par organisme indépendant",
                                "Contrôle visuel chants: pas de défaut de laminage",
                                "Contrôle visuel: pas de feuilletage",
                                "Essai corrosion intergranulaire (EN ISO 3651-2)",
                                "Essai de résilience si épaisseur > 12 mm",
                                "CND: ultrasons selon EN 10307 si épaisseur ≥ 30 mm",
                                "US classes: S2 (santé interne) / E3 (défauts)",
                                "Exigence chimique: Co (Cobalt) ≤ 0,20 %",
                                "Traitement de surface: passivation obligatoire",
                                // Structure de validation
                                "Identification complète (affaire I362, coulée, fournisseur, date, quantité)",
                                "Validation finale: conformité OK / NC + commentaires, signature, date/heure"
                            ]
                        }
                    }
                }
            }
        }
    }
};


