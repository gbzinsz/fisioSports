var athleteCPFV, athleteNameV, consultationDateV, injuryTypeV, observationsV;

function readForm() {
  athleteCPFV = document.getElementById("athleteCPF").value;
  athleteNameV = document.getElementById("athleteName").value;
  consultationDateV = document.getElementById("consultationDate").value;
  injuryTypeV = document.getElementById("injuryType").value;
  observationsV = document.getElementById("observations").value;
  console.log(athleteCPFV, athleteNameV, consultationDateV, injuryTypeV, observationsV);
}

document.getElementById("insert").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("consultations/")
    .push({
      athleteCPF: athleteCPFV,
      athleteName: athleteNameV,
      consultationDate: consultationDateV,
      injuryType: injuryTypeV,
      observations: observationsV,
    });
  alert("Consulta agendada com sucesso!");
  document.getElementById("athleteCPF").value = "";
  document.getElementById("athleteName").value = "";
  document.getElementById("consultationDate").value = "";
  document.getElementById("injuryType").value = "";
  document.getElementById("observations").value = "";
};

document.getElementById("read").onclick = function () {
  athleteCPFV = document.getElementById("athleteCPF").value;

  firebase
    .database()
    .ref("consultations/")
    .orderByChild("athleteCPF")
    .equalTo(athleteCPFV)
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var consultation = childSnapshot.val();
        document.getElementById("athleteName").value = consultation.athleteName;
        document.getElementById("consultationDate").value = consultation.consultationDate;
        document.getElementById("injuryType").value = consultation.injuryType;
        document.getElementById("observations").value = consultation.observations;
      });
    });
};


document.getElementById("update").onclick = function () {
  readForm();

  athleteCPFV = document.getElementById("athleteCPF").value;

  firebase
    .database()
    .ref("consultations/")
    .orderByChild("athleteCPF")
    .equalTo(athleteCPFV)
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var consultation = childSnapshot.val();
        childSnapshot.ref.update({
          athleteName: athleteNameV,
          consultationDate: consultationDateV,
          injuryType: injuryTypeV,
          observations: observationsV,
        });
      });
    });
  alert("Consulta atualizada com sucesso!");
  document.getElementById("athleteCPF").value = "";
  document.getElementById("athleteName").value = "";
  document.getElementById("consultationDate").value = "";
  document.getElementById("injuryType").value = "";
  document.getElementById("observations").value = "";
};

document.getElementById("delete").onclick = function () {
  athleteCPFV = document.getElementById("athleteCPF").value;

  firebase
    .database()
    .ref("consultations/")
    .orderByChild("athleteCPF")
    .equalTo(athleteCPFV)
    .once("value", function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        childSnapshot.ref.remove();
      });
    });
  alert("Consulta cancelada com sucesso!");
  document.getElementById("athleteCPF").value = "";
  document.getElementById("athleteName").value = "";
  document.getElementById("consultationDate").value = "";
  document.getElementById("injuryType").value = "";
  document.getElementById("observations").value = "";
};
