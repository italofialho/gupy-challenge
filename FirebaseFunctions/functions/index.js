const functions = require('firebase-functions');
const admin = require('firebase-admin');

const cors = require("cors")({
    origin: true
});


admin.initializeApp();

exports.createCandidate = functions.https.onRequest((request, response) => {
    const { candidate } = request.body;

    if (!candidate) {
        cors(request, response, () => {
            return response.json({ code: 204, message: "Nenhum candidato informado" });
        });
        return;
    }

    admin
        .database()
        .ref("Candidates/")
        .push(candidate)
        .then((candidateSnapshot) => {
            const candidateRef = candidateSnapshot.ref;
            const candidateKey = candidateSnapshot.key;

            candidateRef
                .update({
                    _id: candidateKey
                })
                .then(() => {
                    cors(request, response, () => {
                        return response.json({ code: 200, message: 'Currículo cadastrado com sucesso!' });
                    });
                });
        })
});

exports.updateCandidate = functions.https.onRequest((request, response) => {
    const { candidate } = request.body;

    if (!candidate) {
        cors(request, response, () => {
            response.json({ code: 204, message: "Nenhum candidato informado!" });
        });
        return;
    };

    admin
        .database()
        .ref(`Candidates/${candidate._id}`)
        .update(candidate)
        .then(() => {
            cors(request, response, () => {
                return response.send({ code: 200, message: 'Currículo cadastrado com sucesso!' });
            });
        });
});

exports.listCandidates = functions.https.onRequest((request, response) => {

    admin
        .database()
        .ref("Candidates/")
        .once("value")
        .then((candidatesSnapshot) => {
            const candidates = candidatesSnapshot.val();
            cors(request, response, () => {
                return response.json(candidates);
            });
        });
});

exports.getCandidateById = functions.https.onRequest((request, response) => {

    const { candidateId } = request.body;

    if (!candidateId) {
        cors(request, response, () => {
            response.json({ code: 204, message: "Nenhum candidato informado!" });
        });
        return;
    };

    admin
        .database()
        .ref(`Candidates/${candidateId}`)
        .once("value")
        .then((candidateSnapshot) => {
            const candidates = candidateSnapshot.val();
            cors(request, response, () => {
                return response.json(candidates);
            });
        });
});
