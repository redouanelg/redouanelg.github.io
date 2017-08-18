---
title: Course Information
layout: default_pdeSideBar
permalink: /teaching/MAT431/vectorCalculus.html
key: 2
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

Vector calculus (review)
-----------------------

### Gradients
Suppose $$ u(x,y,z) $$  is a scalar valued function. Gradient of $$ u $$, denoted by $$ \nl(u) $$, is defined as

$$
\nl(u) =  \left[\begin{array} {rrrr} \frac{\p u}{\p x} \\  \frac{\p u}{\p y} \\  \frac{\p u}{\p z} \end{array} \right] 
$$

### Divergence
Suppose $$F(x,y,z) = F_1 \mathbf{i} + F_2 \mathbf{j} + F_2 \mathbf{k}$$ is a vector valued function. Divergence of $$F$$, denoted by $$\text{div}(F)$$ of $$\nl \cdot (F)$$ is defined as

$$
\textrm{div} (F) = \frac{\p F_1}{\p x} + \frac{\p F_2}{\p y} + \frac{\p F_3}{\p z} 
$$

### Laplacian

Laplacian of a scalar valued function $$u(x,y,z)$$, denoted by $$\Dt(u)$$, is defined as

$$
\Dt (u) = \textrm{div} (\nl u) = \frac{\p^2 u}{\p x^2} + \frac{\p^2 u}{\p y^2} + \frac{\p^2 u}{\p z^2} 
$$

### Divergence Theorem

Recall *divergence theorem* from vector calculus. If $$\vec{F}$$ is a vector field, $$V$$ is a given volume, $$\p V$$ is the the boundary of $$V$$, then the flux of $$\vec{F}$$ across $$\p V$$ is equal to the volume integration of $$ \divc(\vec{F})$$. 

$$
\int_{\p V} \vec{F} \cdot \hat{n} \, dS = \int_V \divc (\vec{F}) d V 
$$


