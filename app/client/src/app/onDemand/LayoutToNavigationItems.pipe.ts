import { Pipe, PipeTransform } from '@angular/core';
import type { Layout } from './onDemand.component'
import type { NavigationItem } from '../navigation/navigation.component'

/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'layoutToNavigationItems'})
export class LayoutToNavigationItemsPipe implements PipeTransform {
  transform(layout: Layout): NavigationItem[] {
    return layout.map(
      section => ({
        text: section.name || section.id,
        routerLink: ['/on-demand', section.id],
        id: section.id
      })
    );
  }
}