import { Component } from '@angular/core';

@Component({
  selector: 'app-categories-details',
  imports: [],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.scss'
})
export class CategoriesDetailsComponent {
//   private readonly categoriesService=inject(CategoriesService)
//   private readonly activatedRoute=inject(ActivatedRoute)

//   SpeciaficCategories:WritableSignal<any[]>=signal([])
//   catId:string|null = ''
// ngOnInit(): void {
//     this.activatedRoute.paramMap.subscribe({
//       next:(parmas)=>{
//        this.catId= parmas.get('id')
//       }
//     })
//     this.categoriesService.getSpecificCategories(this.catId).subscribe({
//       next:(res)=>{
//         console.log(res)
//         this.SpeciaficCategories=res.data
//       }
//     })
// }
}
