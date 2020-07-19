import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "./shared/service";
//import { FileSelectDirective } from 'ng2-file-upload';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {


  employees: any = [];
  uploadForm: FormGroup;
  salary: number = 0;

  /*
   * injection des services à utiliser pour envoyer les requétes au serveur.
   * 19/07/2020
   */
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: [""],
      salary: [""],
    });
  }

  /*
   * selectionner le fichier qui contient la liste des employées
   * */
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get("profile").setValue(file);
    }
  }

  /*
   * la méthode qui fait appel au service recherche des employés selon
   * le critére choisi (ici c'est la salaire de l'employé)
   * 19/07/2020
   */
  getEmployeesByCriteria() {
    const formData = new FormData();
    formData.append("file", this.uploadForm.get("profile").value);
    this.salary = this.uploadForm.get("salary").value;
    console.log(formData);
    this.employeeService
      .getEmployeesByCriteria(formData, this.salary)
      .subscribe((resp) => {
        this.employees = resp;
        console.log(this.employees);
      });
  }

  
}
