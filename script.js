// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    const normeSelect = document.getElementById('norme-select');
    const matiereSelect = document.getElementById('matiere-select');
    const dimensionSelect = document.getElementById('dimension-select');
    const formeSelect = document.getElementById('forme-select');
    const referentielSelect = document.getElementById('referentiel-select');
    const quantiteInput = document.getElementById('quantite-input');
    const printBtn = document.getElementById('print-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    
    // Remplir les normes
    Object.keys(verificationData.normes).forEach(normeId => {
        const option = document.createElement('option');
        option.value = normeId;
        option.textContent = verificationData.normes[normeId].nom;
        normeSelect.appendChild(option);
    });

    // Remplir les formes (statique)
    const formes = [
        { id: 'toles', nom: 'Tôles' },
        { id: 'tubes', nom: 'Tubes' },
        { id: 'barres', nom: 'Barres / Tiges / Profils' }
    ];
    if (formeSelect) {
        formes.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f.id;
            opt.textContent = f.nom;
            formeSelect.appendChild(opt);
        });
        formeSelect.disabled = true;
    }
    if (referentielSelect) {
        referentielSelect.disabled = true;
    }
    
    // Gestionnaire pour le changement de norme
    normeSelect.addEventListener('change', function() {
        const normeId = this.value;
        
        // Réinitialiser les sélections suivantes
        matiereSelect.innerHTML = '<option value="">-- Sélectionner une matière --</option>';
        dimensionSelect.innerHTML = '<option value="">-- Sélectionner d\'abord une matière --</option>';
        matiereSelect.disabled = !normeId;
        dimensionSelect.disabled = true;
        // reset forme / référentiel
        if (formeSelect) {
            formeSelect.value = '';
            formeSelect.disabled = true;
        }
        if (referentielSelect) {
            referentielSelect.innerHTML = '<option value="">-- Sélectionner un référentiel --</option>';
            referentielSelect.disabled = true;
        }
        
        if (normeId) {
            // Remplir les matières pour cette norme
            const norme = verificationData.normes[normeId];
            Object.keys(norme.matieres).forEach(matiereId => {
                const option = document.createElement('option');
                option.value = matiereId;
                option.textContent = norme.matieres[matiereId].nom;
                matiereSelect.appendChild(option);
            });
        }
        
        updateChecklist();
    });
    
    // Gestionnaire pour le changement de matière
    matiereSelect.addEventListener('change', function() {
        const normeId = normeSelect.value;
        const matiereId = this.value;
        
        // Réinitialiser les dimensions
        dimensionSelect.innerHTML = '<option value="">-- Sélectionner des dimensions --</option>';
        dimensionSelect.disabled = !matiereId;
        // Activer forme quand une matière est choisie
        if (formeSelect) {
            formeSelect.disabled = !matiereId;
        }
        // Activer classe quand une matière est choisie
        updateClasseState();
        // Reset référentiel
        if (referentielSelect) {
            referentielSelect.innerHTML = '<option value="">-- Sélectionner un référentiel --</option>';
            referentielSelect.disabled = true;
        }
        
        if (normeId && matiereId) {
            // Remplir les dimensions pour cette matière
            const matiere = verificationData.normes[normeId].matieres[matiereId];
            Object.keys(matiere.dimensions).forEach(dimensionId => {
                const option = document.createElement('option');
                option.value = dimensionId;
                option.textContent = matiere.dimensions[dimensionId].nom;
                dimensionSelect.appendChild(option);
            });
        }
        
        updateChecklist();
    });
    
    // Gestionnaire pour le changement de dimensions
    dimensionSelect.addEventListener('change', updateChecklist);
    
    // Gestionnaire pour le changement de forme
    if (formeSelect) {
        formeSelect.addEventListener('change', function() {
            if (!referentielSelect) return;
            const formeId = this.value;
            const normeId = normeSelect.value;
            const matiereId = matiereSelect.value;
            referentielSelect.innerHTML = '<option value="">-- Sélectionner un référentiel --</option>';
            let options = [];
            if (normeId === 'rcc-cw' && matiereId === 'x2crnimo17-12-2') {
                if (formeId === 'toles') options = ['EN 10028-7', 'EN 10088-2'];
                if (formeId === 'tubes') options = ['EN 10216-5', 'EN 10217-7'];
                if (formeId === 'barres') options = ['EN 10088-3', 'EN 10263-5'];
            }
            options.forEach(txt => {
                const o = document.createElement('option');
                o.value = txt;
                o.textContent = txt;
                referentielSelect.appendChild(o);
            });
            referentielSelect.disabled = options.length === 0;
            updateChecklist();
        });
    }
    if (referentielSelect) {
        referentielSelect.addEventListener('change', updateChecklist);
    }
    
    // Gestionnaire pour le changement de quantité
    quantiteInput.addEventListener('input', updateChecklist);

    // Tolérances d'épaisseur (classes A-D)
    const toleranceTable = {
        A: [
            { range: '3 ≤ t < 5', min: -0.3, max: +0.7 },
            { range: '5 ≤ t < 8', min: -0.4, max: +0.8 },
            { range: '8 ≤ t < 15', min: -0.5, max: +0.9 },
            { range: '15 ≤ t < 25', min: -0.6, max: +1.0 },
            { range: '25 ≤ t < 40', min: -0.7, max: +1.3 },
            { range: '40 ≤ t < 80', min: -0.9, max: +1.7 },
            { range: '80 ≤ t < 150', min: -1.1, max: +2.1 },
            { range: '150 ≤ t < 250', min: -1.2, max: +2.4 },
            { range: '250 ≤ t ≤ 400', min: -1.3, max: +3.5 }
        ],
        B: [
            { range: '3 ≤ t < 5', min: -0.3, max: +0.7 },
            { range: '5 ≤ t < 8', min: -0.3, max: +0.9 },
            { range: '8 ≤ t < 15', min: -0.3, max: +1.1 },
            { range: '15 ≤ t < 25', min: -0.3, max: +1.3 },
            { range: '25 ≤ t < 40', min: -0.3, max: +1.7 },
            { range: '40 ≤ t < 80', min: -0.3, max: +2.3 },
            { range: '80 ≤ t < 150', min: -0.3, max: +2.9 },
            { range: '150 ≤ t < 250', min: -0.3, max: +3.3 },
            { range: '250 ≤ t ≤ 400', min: -0.3, max: +4.5 }
        ],
        C: [
            { range: '3 ≤ t < 5', min: 0.0, max: +1.0 },
            { range: '5 ≤ t < 8', min: 0.0, max: +1.2 },
            { range: '8 ≤ t < 15', min: 0.0, max: +1.4 },
            { range: '15 ≤ t < 25', min: 0.0, max: +1.6 },
            { range: '25 ≤ t < 40', min: 0.0, max: +2.0 },
            { range: '40 ≤ t < 80', min: 0.0, max: +2.6 },
            { range: '80 ≤ t < 150', min: 0.0, max: +3.2 },
            { range: '150 ≤ t < 250', min: 0.0, max: +3.6 },
            { range: '250 ≤ t ≤ 400', min: 0.0, max: +4.8 }
        ],
        D: [
            { range: '3 ≤ t < 5', min: -0.5, max: +0.5 },
            { range: '5 ≤ t < 8', min: -0.6, max: +0.6 },
            { range: '8 ≤ t < 15', min: -0.7, max: +0.7 },
            { range: '15 ≤ t < 25', min: -0.8, max: +0.8 },
            { range: '25 ≤ t < 40', min: -1.0, max: +1.0 },
            { range: '40 ≤ t < 80', min: -1.3, max: +1.3 },
            { range: '80 ≤ t < 150', min: -1.6, max: +1.6 },
            { range: '150 ≤ t < 250', min: -1.8, max: +1.8 },
            { range: '250 ≤ t ≤ 400', min: -2.4, max: +2.4 }
        ]
    };

    const classeSelect = document.getElementById('classe-select');
    const epaisseurSelect = document.getElementById('epaisseur-select');
    if (classeSelect) classeSelect.disabled = true;
    if (epaisseurSelect) epaisseurSelect.disabled = true;

    // Activer classe/épaisseur quand une matière est choisie
    function updateClasseState() {
        if (classeSelect) classeSelect.disabled = !(matiereSelect.value);
        if (epaisseurSelect) {
            epaisseurSelect.innerHTML = '<option value="">-- Sélectionner une épaisseur --</option>';
            epaisseurSelect.disabled = true;
        }
        const infoTol = document.getElementById('info-tolerances');
        if (infoTol) infoTol.textContent = '-';
    }

    if (classeSelect) {
        classeSelect.addEventListener('change', function() {
            if (!epaisseurSelect) return;
            const cls = this.value;
            epaisseurSelect.innerHTML = '<option value="">-- Sélectionner une épaisseur --</option>';
            if (toleranceTable[cls]) {
                toleranceTable[cls].forEach(entry => {
                    const o = document.createElement('option');
                    o.value = entry.range;
                    o.textContent = entry.range + `  (tol: ${entry.min} / +${entry.max} mm)`;
                    epaisseurSelect.appendChild(o);
                });
                epaisseurSelect.disabled = false;
            } else {
                epaisseurSelect.disabled = true;
            }
            updateChecklist();
        });
    }

    if (epaisseurSelect) {
        epaisseurSelect.addEventListener('change', updateChecklist);
    }
    
    // Fonction pour mettre à jour la checklist
    function updateChecklist() {
        const normeId = normeSelect.value;
        const matiereId = matiereSelect.value;
        const dimensionId = dimensionSelect.value;
        const quantite = quantiteInput.value;
        const classe = (document.getElementById('classe-select') || {}).value || '';
        const epaisseur = (document.getElementById('epaisseur-select') || {}).value || '';
        let tolText = '-';
        if (classe && epaisseur && toleranceTable[classe]) {
            const found = toleranceTable[classe].find(e => e.range === epaisseur);
            if (found) tolText = `${found.min} / +${found.max} mm`;
        }
        const referentiel = referentielSelect ? referentielSelect.value : '';
        
        const checklistContainer = document.getElementById('checklist-container');
        const noSelection = document.getElementById('no-selection');
        
        if (normeId && matiereId && dimensionId) {
            // Afficher la checklist
            checklistContainer.style.display = 'block';
            noSelection.style.display = 'none';
            
            // Mettre à jour les informations
            const norme = verificationData.normes[normeId];
            const matiere = norme.matieres[matiereId];
            const dimension = matiere.dimensions[dimensionId];
            
            document.getElementById('info-norme').textContent = norme.nom;
            document.getElementById('info-matiere').textContent = matiere.nom;
            document.getElementById('info-dimension').textContent = dimension.nom;
            const infoRef = document.getElementById('info-referentiel');
            if (infoRef) infoRef.textContent = referentiel || '-';
            document.getElementById('info-quantite').textContent = quantite || '-';
            const infoClasse = document.getElementById('info-classe');
            if (infoClasse) infoClasse.textContent = classe || '-';
            const infoEpa = document.getElementById('info-epaisseur');
            if (infoEpa) infoEpa.textContent = epaisseur || '-';
            const infoTol = document.getElementById('info-tolerances');
            if (infoTol) infoTol.textContent = tolText;
            
            // Afficher les vérifications
            const checklistItems = document.getElementById('checklist-items');
            checklistItems.innerHTML = '';
            
            dimension.verifications.forEach((verification, index) => {
                const li = document.createElement('li');
                li.className = 'checklist-item';
                li.innerHTML = `
                    <input type="checkbox" id="check-${index}" class="check-input">
                    <label for="check-${index}" class="check-label">${verification}</label>
                `;
                checklistItems.appendChild(li);
            });
            
            // Si quantité spécifiée, ajouter une note
            if (quantite) {
                const note = document.createElement('div');
                note.className = 'quantity-note';
                note.innerHTML = `<strong>Note :</strong> Vérifier ${quantite} pièce(s) selon les critères ci-dessus.`;
                checklistItems.appendChild(note);
            }
        } else {
            // Masquer la checklist
            checklistContainer.style.display = 'none';
            noSelection.style.display = 'block';
        }
    }

    function buildPrintArea() {
            const normeId = normeSelect.value;
            const matiereId = matiereSelect.value;
            const dimensionId = dimensionSelect.value;
            const quantite = quantiteInput.value;
            const referentiel = referentielSelect ? referentielSelect.value : '';
            const classe = (document.getElementById('classe-select') || {}).value || '';
            const epaisseur = (document.getElementById('epaisseur-select') || {}).value || '';
            let tolText = '-';
            if (classe && epaisseur && toleranceTable[classe]) {
                const found = toleranceTable[classe].find(e => e.range === epaisseur);
                if (found) tolText = `${found.min} / +${found.max} mm`;
            }

            if (!normeId || !matiereId || !dimensionId) {
                alert('Veuillez sélectionner une norme, une matière et des dimensions avant l\'export.');
                return false;
            }

            const norme = verificationData.normes[normeId];
            const matiere = norme.matieres[matiereId];
            const dimension = matiere.dimensions[dimensionId];

            const now = new Date();
            const dateStr = now.toLocaleDateString('fr-FR');
            const timeStr = now.toLocaleTimeString('fr-FR');

            const printArea = document.getElementById('print-area');
            if (!printArea) return false;

            const itemsHtml = dimension.verifications.map((v, i) => {
                return `<li class="checklist-item"><span class="check-label">${v}</span></li>`;
            }).join('');

            printArea.innerHTML = `
                <div id="export-scope" class="checklist-container">
                    <h2>Contrôle réception matière — Affaire I362</h2>
                    <div class="checklist-info">
                        <div class="info-item"><strong>Entreprise</strong><span>Groupe ADF</span></div>
                        <div class="info-item"><strong>Date</strong><span>${dateStr} ${timeStr}</span></div>
                        <div class="info-item"><strong>Norme / Code</strong><span>${norme.nom}</span></div>
                        <div class="info-item"><strong>Matière</strong><span>${matiere.nom}</span></div>
                        <div class="info-item"><strong>Dimensions</strong><span>${dimension.nom}</span></div>
                        <div class="info-item"><strong>Quantité</strong><span>${quantite || '-'}</span></div>
                    </div>
                    <ul class="checklist-items">
                        ${itemsHtml}
                    </ul>
                    <div style="margin-top:20px;">
                        <div style="height:1px;background:#ddd;margin:12px 0;"></div>
                        <div style="display:flex;gap:24px;flex-wrap:wrap;">
                            <div><strong>Réceptionnaire (signature):</strong> ______________________</div>
                            <div><strong>Date:</strong> ______________________</div>
                        </div>
                    </div>
                </div>
            `;

            return true;
    }

    // Impression papier
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            if (buildPrintArea()) window.print();
        });
    }

    // Export PDF direct (vectoriel): génération avec jsPDF (texte/lignes)
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            try {
                // Vérifier que jsPDF est disponible
                let jsPDF;
                if (window.jspdf && window.jspdf.jsPDF) {
                    jsPDF = window.jspdf.jsPDF;
                } else if (window.jsPDF) {
                    jsPDF = window.jsPDF;
                } else {
                    console.error('jsPDF non trouvé. window.jspdf:', window.jspdf, 'window.jsPDF:', window.jsPDF);
                    alert('Export PDF indisponible (jsPDF manquant). Vérifiez votre connexion internet et réessayez.');
                    return;
                }

                const normeId = normeSelect.value;
                const matiereId = matiereSelect.value;
                const dimensionId = dimensionSelect.value;
                const quantite = quantiteInput.value;
                const referentiel = referentielSelect ? referentielSelect.value : '';
                const classe = (document.getElementById('classe-select') || {}).value || '';
                const epaisseur = (document.getElementById('epaisseur-select') || {}).value || '';
                let tolText = '-';
                if (classe && epaisseur && toleranceTable[classe]) {
                    const found = toleranceTable[classe].find(e => e.range === epaisseur);
                    if (found) tolText = `${found.min} / +${found.max} mm`;
                }

                if (!normeId || !matiereId || !dimensionId) {
                    alert('Veuillez sélectionner une norme, une matière et des dimensions avant l\'export.');
                    return;
                }

                const norme = verificationData.normes[normeId];
                const matiere = norme.matieres[matiereId];
                const dimension = matiere.dimensions[dimensionId];

                const pdf = new jsPDF('p', 'mm', 'a4');

                // Mise en page
                const pageWidth = 210;
                const pageHeight = 297;
                const marginX = 15;
                const marginY = 15;
                const contentWidth = pageWidth - marginX * 2;
                const lineH = 6; // interligne
                let y = marginY;

                pdf.setDrawColor(0);
                pdf.setTextColor(0);
                pdf.setLineWidth(0.3);

                function checkAddPage(extra = 0) {
                    if (y + extra > pageHeight - marginY) {
                        pdf.addPage();
                        y = marginY;
                    }
                }

                function title(text) {
                    pdf.setFont('helvetica', 'bold');
                    pdf.setFontSize(14);
                    const textWidth = pdf.getTextWidth(text);
                    const x = marginX + (contentWidth - textWidth) / 2;
                    pdf.text(text, x, y);
                    y += lineH + 2;
                }

                function subtitle(text) {
                    pdf.setFont('helvetica', 'bold');
                    pdf.setFontSize(12);
                    pdf.text(text, marginX, y);
                    y += lineH;
                }

                function infoTable(rows) {
                    pdf.setFont('helvetica', 'normal');
                    pdf.setFontSize(11);
                    const labelW = 40; // largeur fixe pour étiquettes
                    const valueW = contentWidth / 2 - labelW - 4; // deux colonnes
                    let col = 0;
                    rows.forEach(([label, value]) => {
                        const baseX = marginX + col * (contentWidth / 2);
                        const labelX = baseX;
                        const valueX = baseX + labelW;
                        const wrapped = pdf.splitTextToSize(String(value), valueW);
                        const blockH = Math.max(lineH, wrapped.length * lineH);
                        checkAddPage(blockH);
                        pdf.setFont('helvetica', 'bold');
                        pdf.text(label + ':', labelX, y);
                        pdf.setFont('helvetica', 'normal');
                        wrapped.forEach((t, i) => pdf.text(t, valueX, y + i * lineH));
                        // lignes guides optionnelles
                        y += blockH;
                        // basculer colonne
                        col = (col + 1) % 2;
                        if (col === 0) {
                            // ligne de séparation horizontale entre rangées
                            pdf.setDrawColor(200);
                            pdf.line(marginX, y + 1, marginX + contentWidth, y + 1);
                            pdf.setDrawColor(0);
                            y += 3;
                        }
                    });
                    // si une seule colonne utilisée sur la dernière rangée, force séparation
                    if (col === 1) {
                        pdf.setDrawColor(200);
                        pdf.line(marginX, y + 1, marginX + contentWidth, y + 1);
                        pdf.setDrawColor(0);
                        y += 3;
                    }
                }

                function checklist(items) {
                    subtitle('Checklist de vérification');
                    pdf.setFont('helvetica', 'normal');
                    pdf.setFontSize(11);
                    const box = 4.5;
                    const gap = 3;
                    const textW = contentWidth - box - gap;
                    items.forEach(text => {
                        const wrapped = pdf.splitTextToSize(String(text), textW);
                        const blockH = Math.max(box, wrapped.length * lineH);
                        checkAddPage(blockH + 1);
                        // case (alignée verticalement avec le texte)
                        const yMid = y - (lineH / 2) + 1; // centre visuel de la ligne
                        const boxTop = yMid - (box / 2);
                        pdf.rect(marginX, boxTop, box, box);
                        // texte
                        wrapped.forEach((t, i) => pdf.text(t, marginX + box + gap, y + i * lineH));
                        y += blockH + 1;
                    });
                    y += lineH;
                    checkAddPage(lineH);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text('Réceptionnaire (signature):', marginX, y);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text('______________________', marginX + 60, y);
                    pdf.setFont('helvetica', 'bold');
                    pdf.text('Date:', marginX + 120, y);
                    pdf.setFont('helvetica', 'normal');
                    pdf.text('________________', marginX + 135, y);
                }

                title('Contrôle réception matière — Affaire I362');
                subtitle('Informations');
                const now = new Date();
                infoTable([
                    ['Entreprise', 'Groupe ADF'],
                    ['Date', `${now.toLocaleDateString('fr-FR')} ${now.toLocaleTimeString('fr-FR')}`],
                    ['Norme / Code', norme.nom],
                    ['Matière', matiere.nom],
                    ['Référentiel EN', referentiel || '-'],
                    ['Classe épaisseur', classe || '-'],
                    ['Épaisseur (t)', epaisseur || '-'],
                    ['Tolérances t', tolText],
                    ['Dimensions', dimension.nom],
                    ['Quantité', quantite || '-']
                ]);
                checklist(dimension.verifications);
                
                // Message de disclaimer
                y += lineH * 2;
                checkAddPage(lineH * 8);
                
                // Ligne de séparation
                pdf.setDrawColor(200);
                pdf.line(marginX, y, marginX + contentWidth, y);
                pdf.setDrawColor(0);
                y += lineH * 2;
                
                // Message d'avertissement
                pdf.setFont('helvetica', 'bold');
                pdf.setFontSize(10);
                pdf.setTextColor(200, 0, 0); // Rouge pour l'importance
                const disclaimerTitle = 'AVERTISSEMENT IMPORTANT';
                const titleWidth = pdf.getTextWidth(disclaimerTitle);
                pdf.text(disclaimerTitle, marginX + (contentWidth - titleWidth) / 2, y);
                y += lineH * 1.5;
                
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9);
                pdf.setTextColor(0, 0, 0); // Retour au noir
                const disclaimerText = 'En aucun cas ce document ne doit être utilisé pour des projets réels ou des contrôles qualité officiels. ' +
                    'L\'utilisation de ce document se fait à vos propres risques et périls.';
                const wrappedDisclaimer = pdf.splitTextToSize(disclaimerText, contentWidth);
                wrappedDisclaimer.forEach((line, i) => {
                    checkAddPage(lineH);
                    pdf.text(line, marginX, y + i * lineH);
                });
                y += wrappedDisclaimer.length * lineH + lineH;
                
                // Contact
                checkAddPage(lineH * 2);
                pdf.setFont('helvetica', 'normal');
                pdf.setFontSize(9);
                pdf.text('Pour plus d\'informations, contacter : baptistemail15@gmail.com', marginX, y);
                
                pdf.save('ADF_I362_Checklist.pdf');
            } catch (error) {
                console.error('Erreur lors de l\'export PDF:', error);
                alert('Erreur lors de l\'export PDF: ' + error.message + '\nVérifiez la console pour plus de détails.');
            }
        });
    }
});

