---
title: Course Information
layout: default_pdeSideBar
permalink: /teaching/MAT431/pdeDef.html
---


<!---
#+latex_header: \newcommand{\Sig}{\Sigma}
#+latex_header: \newcommand{\Om}{\Omega}
#+latex_header: \newcommand{\om}{\omega}
#+latex_header: \newcommand{\Gm}{\Gamma}
#+latex_header: \newcommand{\tor}{\rightarrow}
#+latex_header: \newcommand{\R}{\mathbf{R}}
#+latex_header: \newcommand{\p}{\partial}
#+latex_header: \newcommand{\nl}{\nabla}
#+latex_header: \newcommand{\Dt}{\Delta}
#+latex_header: \newcommand{\dt}{\delta}
#+latex_header: \newcommand{\ep}{\epsilon}
#+latex_header: \newcommand{\vp}{\varphi}
#+latex_header: \newcommand{\ve}{\mathbf{\varepsilon}}
#+latex_header: \newcommand{\ml}{\left[\begin{array}}
#+latex_header: \newcommand{\mr}{\end{array}\right]}
#+latex_header: \newcommand{\divc}{\mathbf{div}}
--->



Project 1 : Introduction to PDEs and Matlab pde toolbox
-------------------------------

### Definition of a PDE
A Partial Differential Equation (PDE) is an equation in which

- the unknown $$u(x,y,z)$$  is a multivariable function
- at least one term in the equation must have some partial derivative of the unknown

### Examples

#### Poisson's equation [[Wiki](https://en.wikipedia.org/wiki/Poisson%27s_equation)]

$$
\Dt \phi = f
$$


#### Heat Equation, Diffusion Equation ([Wiki](https://en.wikipedia.org/wiki/Heat_equation)]

$$
\frac{\p u}{\p t} -\alpha \left(\frac{\p^2 u}{\p x^2} + \frac{\p^2 u}{\p y^2} + \frac{\p^2 u}{\p z^2} \right) = 0
$$


#### Convection and diffusion equation [[Wiki](https://en.wikipedia.org/wiki/Convection%E2%80%93diffusion_equation)]

$$
\frac{\partial c}{\partial t}  = \nabla \cdot (D \nabla c) - \nabla \cdot (\vec{v} c) + R
$$


#### Wave equation [[Wiki]([https://en.wikipedia.org/wiki/Wave_equation)]
$$
{ \partial^2 u \over \partial t^2 } = c^2 \nabla^2 u
$$

#### Equations of Mechanical Engineering [[Link](https://in.mathworks.com/help/pde/structural-mechanics-equations.html?s_tid=srchtitle)]

#### PDE is air pollution study [[Link](http://www.sciencedirect.com/science/article/pii/S0895717706000793)]


#### Navier-Stokes Equation [[Link](https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations)]


### Typical structure of a PDE problem:

Typically, we will be looking for a function $$u$$ which 

- satisfies a given PDE in the interior of a given domain $$\Om$$
- and some information about $$u$$ will be given at the boundary of the domain $$\p \Om$$.



### Matlab pdetoolbox demo

A toolbox for solving 2d & 3d generic pde using Finite Element Method

#### Example 1: (Matlab tutorial) Solve Poisson's Equation on a Unit Disk

###### Follow along

###### Review steps
* What was the domain?
* What was the equation?
* What was the boundary condition?
* What it it that you just plotted?


#### Example 2: Solve the Poisson equation in the unit square

$$ 
\Dt(u) = 0, \qquad \textrm{for }   0 \le x,y, \le 1,
$$

with boundary conditions: $$u(y,0) = 0,  u(1,y) = 1 \;\forall y$$, and $$\frac{\p u}{\p y}(x,0) = \frac{\p u}{\p y}(x,1) =0 $$ for all $$  0 \le x \le 1$$.


#### Example 3: (Matlab tutorial) Poisson's Equation with Complex 2-D Geometry

#### Exercise 1: A shell with hot inside ring

![alt text](./images/shellHeat.png)


#### Exercise 2: A shell with hot inside ring and Neumann boundary outside

![alt text](./images/shellHeatNeumannBd.png)


#### Project 1: Solve a given PDE with slightly non trivial domain in matlab.


